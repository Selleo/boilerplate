import { WelcomeEmail, ResetPasswordEmail } from "@repo/email-templates";
import { Injectable } from "@nestjs/common";
import { EmailService } from "src/common/emails/emails.service";
import {
  EMAIL_FROM,
  RESET_PASSWORD_EMAIL,
  WELCOME_VERIFY_EMAIL,
} from "src/common/emails/email.consts";
import { AuthEmailService } from "./auth-email.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    private readonly authEmailService: AuthEmailService,
  ) {}

  public async onWelcomeEmail(data: {
    email: string;
    name: string;
    url: string;
  }) {
    await this.authEmailService.sendWelcomeMessageEmailAsync({
      email: data.email,
      name: data.name,
      url: data.url,
    });
  }

  public async onResetPasswordEmail(data: {
    email: string;
    name: string;
    url: string;
  }) {
    await this.authEmailService.sendResetPasswordEmailAsync({
      email: data.email,
      name: data.name,
      url: data.url,
    });
  }

  public async sendResetPassordEmail(
    to: string,
    data: {
      url: string;
      name: string;
    },
  ) {
    const email = await new ResetPasswordEmail({
      name: data.name,
      url: data.url,
    }).getHtml();

    await this.emailService.sendEmail({
      to: to,
      from: EMAIL_FROM,
      subject: RESET_PASSWORD_EMAIL.subject,
      html: email,
    });
  }

  public async sendWelcomeVerifyEmail(
    to: string,
    data: {
      email: string;
      name: string;
      url: string;
    },
  ) {
    const email = await new WelcomeEmail({
      name: data.name,
      redirectUrl: data.url,
      email: data.email,
    }).getHtml();

    await this.emailService.sendEmail({
      to: to,
      from: EMAIL_FROM,
      subject: WELCOME_VERIFY_EMAIL.subject,
      html: email,
    });
  }
}
