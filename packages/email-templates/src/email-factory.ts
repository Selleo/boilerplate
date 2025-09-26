import { render, toPlainText } from "@react-email/components";
import { EmailContent } from "./email-content.js";

export function emailTemplateFactory<T extends unknown[]>(
  template: (...args: T) => Parameters<typeof render>[0]
): new (...args: T) => EmailContent {
  return class implements EmailContent {
    private readonly args: T;

    constructor(...args: T) {
      this.args = args;
    }

    get props(): T {
      return this.args;
    }

    async getText(): Promise<string> {
      const html = await render(template(...this.props));
      const plainText = toPlainText(html);
      return plainText;
    }

    async getHtml(): Promise<string> {
      return render(template(...this.props));
    }
  };
}
