import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useRequestPasswordReset } from "~/api/mutations/useRequestPasswordReset";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const createForgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z.email({
      message: t("forgotPassword.fields.email.errors.invalid")
    })
  });

type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { mutate, isPending } = useRequestPasswordReset();
  const schema = React.useMemo(() => createForgotPasswordSchema(t), [t]);
  const resolver = React.useMemo(() => zodResolver(schema), [schema]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<ForgotPasswordFormValues>({
    resolver
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(
      {
        data: { email: values.email }
      },
      {
        onSuccess: () => {
          reset();
        }
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-16">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("forgotPassword.title")}</CardTitle>
          <CardDescription>{t("forgotPassword.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">{t("forgotPassword.fields.email.label")}</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email ? (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              ) : null}
            </div>
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending
                ? t("forgotPassword.buttons.submitting")
                : t("forgotPassword.buttons.submit")}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("forgotPassword.links.remember")}{" "}
            <Link className="font-medium text-primary" to="/auth">
              {t("forgotPassword.links.backToLogin")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
