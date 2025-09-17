import { match, P } from "ts-pattern";
import { LocalAdapter } from "../adapters/local.adapter";
import { SmtpAdapter } from "../adapters/smtp.adapter";
import { AWSSESAdapter } from "../adapters/ses.adapter";

export class ExternalEmailAdapterFactory {
  private readonly configService = {
    get: (key: string) => process.env[key],
  };

  createAdapter() {
    const adapterType = this.configService.get("EMAIL_ADAPTER");
    const adapter = match(adapterType)
      .with("mailhog", () => LocalAdapter)
      .with("smtp", () => SmtpAdapter)
      .with("ses", () => AWSSESAdapter)
      .with(P.nullish, () => {
        throw new Error("EMAIL_ADAPTER is not defined in configuration");
      })
      .otherwise((type) => {
        throw new Error(`Unknown email adapter type: ${type}`);
      });

    // @ts-expect-error TODO:
    const adapterInstance = new adapter(this.configService);

    return adapterInstance;
  }
}
