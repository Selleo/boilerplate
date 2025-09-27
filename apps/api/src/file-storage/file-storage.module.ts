import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { FileStorageAdapter } from "./adapters/file-storage.adapter";
import { S3Adapter } from "./adapters/s3.adapter";
import { FileStorageService } from "./file-storage.service";

@Module({
  imports: [ConfigModule],
  providers: [
    FileStorageService,
    S3Adapter,
    {
      provide: FileStorageAdapter,
      useFactory: (configService: ConfigService) => {
        const adapter = configService.get<string>(
          "fileStorage.FILE_STORAGE_ADAPTER",
        );

        if (adapter === "s3") {
          return new S3Adapter(configService);
        }

        throw new Error(`Unknown file storage adapter: ${adapter}`);
      },
      inject: [ConfigService],
    },
  ],
  exports: [FileStorageService],
})
export class FileStorageModule {}
