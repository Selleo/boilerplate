import { Test, TestingModule, TestingModuleBuilder } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import { AppModule } from "../src/app.module";
import { setupTestDatabase } from "./test-database";

type ProviderOverride = {
  provide: Parameters<TestingModuleBuilder["overrideProvider"]>[0];
  useValue?: unknown;
  useClass?: new (...args: unknown[]) => unknown;
  useFactory?: (...args: unknown[]) => unknown;
  inject?: unknown[];
};

export async function createE2ETest(
  providerOverrides: ProviderOverride[] = [],
) {
  const { db, connectionString } = await setupTestDatabase();

  process.env.DATABASE_URL = connectionString;

  const testingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  providerOverrides.forEach((override) => {
    const overrideBuilder = testingModuleBuilder.overrideProvider(
      override.provide,
    );

    if (Object.prototype.hasOwnProperty.call(override, "useValue")) {
      return overrideBuilder.useValue(override.useValue);
    }

    if (Object.prototype.hasOwnProperty.call(override, "useClass")) {
      return overrideBuilder.useClass(override.useClass!);
    }

    if (Object.prototype.hasOwnProperty.call(override, "useFactory")) {
      return overrideBuilder.useFactory({
        factory: override.useFactory!,
        inject: override.inject ?? [],
      });
    }
  });

  const moduleFixture: TestingModule = await testingModuleBuilder.compile();

  const app = moduleFixture.createNestApplication();

  app.use(cookieParser());

  await app.init();

  return {
    app,
    moduleFixture,
    db,
  };
}
