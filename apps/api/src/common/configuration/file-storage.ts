import { registerAs } from "@nestjs/config";
import { Static, Type } from "@sinclair/typebox";
import { configValidator } from "src/utils/configValidator";

const schema = Type.Object({
  FILE_STORAGE_ADAPTER: Type.Union([
    Type.Literal("s3"),
    Type.Literal("local"),
  ]),
  S3_BUCKET: Type.Optional(Type.String()),
  S3_ENDPOINT: Type.Optional(Type.String()),
});

export type FileStorageConfigSchema = Static<typeof schema>;

const validateFileStorageConfig = configValidator(schema);

export default registerAs("fileStorage", (): FileStorageConfigSchema => {
  const values = {
    FILE_STORAGE_ADAPTER: process.env.FILE_STORAGE_ADAPTER,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
  };
  return validateFileStorageConfig(values);
});
