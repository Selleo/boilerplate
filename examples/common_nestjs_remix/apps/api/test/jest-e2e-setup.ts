import { configureNestJsTypebox } from "nestjs-typebox";
import { setupValidation } from "../src/utils/setup-validation";
import { closeTestDatabase } from "./test-database";

beforeAll(async () => {
  configureNestJsTypebox({
    setFormats: true,
  });
  setupValidation();
});

afterAll(async () => {
  await closeTestDatabase();
});
