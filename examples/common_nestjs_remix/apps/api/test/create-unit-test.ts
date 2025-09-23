import { Provider } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { DatabasePg } from "../src/common";
import { setupTestDatabase } from "./test-database";
import { EmailAdapter } from "src/common/emails/adapters/email.adapter";
import { EmailTestingAdapter } from "./helpers/test-email.adapter";

export interface TestContext {
  module: TestingModule;
  db: DatabasePg;
  teardown: () => Promise<void>;
}

export async function createUnitTest(
  customProviders: Provider[] = [],
): Promise<TestContext> {
  const { db, connectionString } = await setupTestDatabase();

  process.env.DATABASE_URL = connectionString;

  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [...customProviders],
  })
    .overrideProvider(EmailAdapter)
    .useClass(EmailTestingAdapter)
    .compile();

  const teardown = async () => {};

  return {
    module,
    db,
    teardown,
  };
}
