import { emailTemplateFactory } from "./email-factory";
import WelcomeEmailTemplate from "./templates/WelcomeEmail";
export const WelcomeEmail = emailTemplateFactory(WelcomeEmailTemplate);
import WelcomeEmailTwoTemplate from "./templates/WelcomeEmailTwo";
export const WelcomeEmailTwo = emailTemplateFactory(WelcomeEmailTwoTemplate);
import ResetPasswordEmailTemplate from "./templates/ResetPassword";
export const ResetPasswordEmail = emailTemplateFactory(ResetPasswordEmailTemplate);
