import { configureNestJsTypebox } from "nestjs-typebox";
import { setupValidation } from "../src/utils/setup-validation";

beforeAll(async () => {
  configureNestJsTypebox({
    setFormats: true,
  });
  setupValidation();
});






