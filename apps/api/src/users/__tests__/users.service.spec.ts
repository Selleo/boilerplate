import { user } from "../../storage/schema";
import { DatabasePg } from "src/common";
 import { UsersService } from "../users.service";
 import { NotFoundException } from "@nestjs/common";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createUnitTest, TestContext } from "../../../test/create-unit-test";
import { createUserFactory } from "../../../test/factory/user.factory";
import { truncateTables } from "../../../test/helpers/test-helpers";

describe("UsersService", () => {
  let testContext: TestContext;
  let usersService: UsersService;
  let db: DatabasePg;
  let userFactory: ReturnType<typeof createUserFactory>;

  beforeAll(async () => {
    testContext = await createUnitTest();
    usersService = testContext.module.get(UsersService);
    db = testContext.db;
    userFactory = createUserFactory(db);
  }, 30000);

  afterAll(async () => {
    await testContext.teardown();
  });

  afterEach(async () => {
    await truncateTables(db, ["user"]);
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      const testUsers = Array.from({ length: 2 }, () => userFactory.build());
      await db.insert(user).values([
        {
          email: testUsers[0].email,
          name: testUsers[0].name,
          id: testUsers[0].id,
        },
        {
          email: testUsers[1].email,
          name: testUsers[1].name,
          id: testUsers[1].id,
        },
      ]);

      const result = await usersService.getUsers();

      expect(result).toHaveLength(2);
      expect(result[0].email).toBe(testUsers[0].email);
      expect(result[1].email).toBe(testUsers[1].email);
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const testUser = userFactory.build();
      await db.insert(user).values([
        {
          email: testUser.email,
          name: testUser.name,
          id: testUser.id,
        },
      ]);
      const result = await usersService.getUserById(testUser.id);

      expect(result).toBeDefined();
      expect(result.email).toBe("" + testUser.email);
      expect(result.id).toBe(testUser.id);
      expect(result.name).toBe(testUser.name);
    });

    it("should throw NotFoundException if user not found", async () => {
      await expect(
        usersService.getUserById(crypto.randomUUID()),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
