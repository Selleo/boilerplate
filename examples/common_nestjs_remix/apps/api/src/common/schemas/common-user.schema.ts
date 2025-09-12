// @ts-expect-error - TODO: fix user tests
import { user, users } from "src/storage/schema";
import { createSelectSchema } from "drizzle-typebox";
import { Static } from "@sinclair/typebox";

export const commonUserSchema = createSelectSchema(user);

export type CommonUser = Static<typeof commonUserSchema>;
