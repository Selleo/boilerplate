import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configureNestJsTypebox } from "nestjs-typebox";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { exportSchemaToFile } from "./utils/save-swagger-to-file";
import { setupValidation } from "./utils/setup-validation";
import cookieParser from "cookie-parser";

import "dotenv/config";

configureNestJsTypebox({
  patchSwagger: true,
  setFormats: true,
});

async function bootstrap() {
  console.log(process.env.NODE_ENV);

  const environment = process.env.NODE_ENV || "production";

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: false,
    logger:
      environment === "production"
        ? ["error", "warn", "log"]
        : ["log", "error", "warn", "debug", "verbose"],
  });

  setupValidation();

  app.use(cookieParser());

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://app.guidebook.localhost",
      "http://localhost:3000",
    ],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle("Guidebook API")
    .setDescription("Example usage of Swagger with Typebox")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  exportSchemaToFile(document);

  await app.listen(3000);
}
bootstrap();
