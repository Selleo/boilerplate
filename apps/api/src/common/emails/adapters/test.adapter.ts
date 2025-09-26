import { Injectable } from "@nestjs/common";
import { EmailAdapter } from "./email.adapter";

@Injectable()
export class TestAdapter extends EmailAdapter {
  constructor() {
    super();
  }

  async sendMail(): Promise<void> {}
}
