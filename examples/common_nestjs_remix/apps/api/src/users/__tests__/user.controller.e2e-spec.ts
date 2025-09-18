import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { castArray, omit } from "lodash";
import { createE2ETest } from "../../../test/create-e2e-test";
import { createUserFactory, User } from "../../../test/factory/user.factory";
import { DatabasePg } from "../../../src/common";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let testUser: User;
  let cookies: string;
  const testPassword = "password123";
  let db: DatabasePg;
  let userFactory: ReturnType<typeof createUserFactory>;

  beforeAll(async () => {
    const { app: testApp } = await createE2ETest();
    app = testApp;
    db = app.get("DB");
    userFactory = createUserFactory(db);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    testUser = await userFactory.create();

    const registerResponse = await request(app.getHttpServer())
      .post("/api/auth/sign-up/email")
      .send({
        email: testUser.email,
        password: testPassword,
        name: testUser.name,
      });

    const userId = registerResponse.body.user.id;

    cookies = registerResponse.headers["set-cookie"];
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
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user by id", async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${testUser.id}`)
        .set("Cookie", cookies)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(omit(response.body.data, ["createdAt", "updatedAt"])).toEqual(
        omit(testUser, ["createdAt", "updatedAt"]),
      );
      expect(response.body.data).not.toHaveProperty("credentials");
    });

    it("should return 404 for non-existent user", async () => {
      await request(app.getHttpServer())
        .get(`/users/${crypto.randomUUID()}`)
        .set("Cookie", cookies)
        .expect(404);
    });
  });
});
