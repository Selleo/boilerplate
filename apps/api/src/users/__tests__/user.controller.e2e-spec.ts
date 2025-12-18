import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { createE2ETest } from "../../../test/create-e2e-test";
import { createUserFactory, User } from "../../../test/factory/user.factory";
import { DatabasePg } from "../../../src/common";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
 import { EmailService } from "src/common/emails/emails.service";
import { Email } from "src/common/emails/email.interface";
import { USER_ALERT_QUEUE } from "../users.queue";
import {
  createQueueTestHarness,
  QueueTestHarness,
} from "../../../test/helpers/bullmq-test-utils";
import { truncateTables } from "../../../test/helpers/test-helpers";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let testUser: User;
  let cookies: string;
  const testPassword = "password123";
  let db: DatabasePg;
  let userFactory: ReturnType<typeof createUserFactory>;
  let sentEmails: Email[] = [];
  let queueHarness: QueueTestHarness;

  beforeAll(async () => {
    const { app: testApp, db: testDb } = await createE2ETest([
      {
        provide: EmailService,
        useValue: {
          sendEmail: async (email: Email) => {
            sentEmails.push(email);
          },
        },
      },
    ]);
    app = testApp;
    db = testDb;
    userFactory = createUserFactory(db);
    queueHarness = await createQueueTestHarness(app, USER_ALERT_QUEUE.name);
  });

  afterAll(async () => {
    await queueHarness?.dispose();
    await app?.close();
  });

  beforeEach(async () => {
    testUser = userFactory.build();

    const registerResponse = await request(app.getHttpServer())
      .post("/api/auth/sign-up/email")
      .send({
        email: testUser.email,
        password: testPassword,
        name: testUser.name,
      });

    testUser.id = registerResponse.body.user.id;

    cookies = registerResponse.headers["set-cookie"];
  });

  afterEach(async () => {
    sentEmails = []
    await queueHarness?.cleanQueue();
    await truncateTables(db, ["user"]);
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const response = await request(app.getHttpServer())
        .get("/users")
        .set("Cookie", cookies)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      const returnedUser = response.body.data[0];

      expect(returnedUser).toBeDefined();
      expect(returnedUser.email).toBe(testUser.email);
      expect(returnedUser.name).toBe(testUser.name);
      expect(returnedUser.id).toBe(testUser.id);
      expect(returnedUser).not.toHaveProperty("credentials");
    })
  });

  describe("GET /users/:id", () => {
    it("should return a user by id", async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${testUser.id}`)
        .set("Cookie", cookies)
        .expect(200);

      const user = response.body.data;

      expect(response.body.data).toBeDefined();
      expect(user.email).toBe(testUser.email);
      expect(user.name).toBe(testUser.name);
      expect(user.id).toBe(testUser.id);
      expect(user).not.toHaveProperty("credentials");
      expect(user.banned).toBe(false);

      expect(response.body.data).not.toHaveProperty("credentials");
    });

    it("should return 404 for non-existent user", async () => {
      await request(app.getHttpServer())
        .get(`/users/${crypto.randomUUID()}`)
        .set("Cookie", cookies)
        .expect(404);
    });
  });

  describe("GET /users/me/alert-email", () => {
    it("should enqueue an alert email job and await its completion", async () => {
      sentEmails = [];
      const jobCompletedPromise = queueHarness.waitForJobCompletion();

      await request(app.getHttpServer())
        .get("/users/me/alert-email")
        .set("Cookie", cookies)
        .expect(200);

      const { jobId } = await jobCompletedPromise;
      const job = await queueHarness.queue.getJob(jobId);

      expect(job?.data.email).toBe(testUser.email);
      expect(sentEmails).toHaveLength(1);
      expect(sentEmails[0]).toMatchObject({
        to: testUser.email,
        subject: "Alert Email",
      });
      expect(sentEmails[0].text).toContain("this is an alert email");
    });
  });
});
