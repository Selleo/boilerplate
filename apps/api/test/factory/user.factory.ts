import { faker } from "@faker-js/faker";
import { InferSelectModel } from "drizzle-orm";
import { Factory } from "fishery";
import { user as userTable } from "../../src/storage/schema";
import { DatabasePg } from "src/common";

export type User = InferSelectModel<typeof userTable>;

export const createUserFactory = (db: DatabasePg) => {
  return Factory.define<
    {
      id: string;
      email: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      image: string | null;
      emailVerified: boolean;
      banned: boolean | null;
      banReason: string | null;
      banExpires: Date | null;
      role: "user" | "admin" | null | string;
    },
    unknown
  >(({ onCreate }) => {
    onCreate(async (user) => {
      const [inserted] = await db.insert(userTable).values(user).returning();
      return inserted;
    });

    return {
      id: faker.string.uuid(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: false,
      image: null,
      name: faker.person.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
      banned: null,
      banReason: null,
      banExpires: null,
      role: "user",
    };
  });
};
