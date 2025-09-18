import { configureNestJsTypebox } from "nestjs-typebox";
import { setupValidation } from "../src/utils/setup-validation";
import { closeTestDatabase } from "./test-database";
import { afterAll, beforeAll } from "vitest";

beforeAll(async () => {
  console.log("[test-setup-e2e][beforeAll] Setting up test environment");
  configureNestJsTypebox({
    setFormats: true,
  });
  setupValidation();
});

afterAll(async () => {
  console.log("[test-setup-e2e][afterAll] Tearing down test environment");
  await closeTestDatabase();
});
