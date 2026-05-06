import { SetMetadata } from "@nestjs/common";

export const Public = () => SetMetadata("PUBLIC", true);
