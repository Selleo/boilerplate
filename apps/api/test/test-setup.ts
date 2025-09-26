import { configureNestJsTypebox } from "nestjs-typebox";
import { setupValidation } from "../src/utils/setup-validation";
import { beforeAll } from "vitest";

beforeAll(async () => {
  console.log("[test-setup][beforeAll] Setting up test environment");
  configureNestJsTypebox({
    setFormats: true,
  });
  setupValidation();
});
