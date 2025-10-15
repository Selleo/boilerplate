import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useResetPassword } from "~/api/mutations/useResetPassword";
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
import { toast } from "sonner";

const createNewPasswordSchema = (t: TFunction) =>
  z
    .object({
      newPassword: z
        .string()
        .min(8, { message: t("newPassword.fields.newPassword.errors.minLength") }),
      confirmPassword: z.string().min(8, {
        message: t("newPassword.fields.confirmPassword.errors.minLength")
      })
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      message: t("newPassword.fields.confirmPassword.errors.mismatch"),
      path: ["confirmPassword"]
    });

type NewPasswordFormValues = z.infer<ReturnType<typeof createNewPasswordSchema>>;

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = searchParams.get("error");
  const schema = React.useMemo(() => createNewPasswordSchema(t), [t]);
  const resolver = React.useMemo(() => zodResolver(schema), [schema]);
  const { mutate, isPending } = useResetPassword();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<NewPasswordFormValues>({
    resolver
  });

  const onSubmit = (values: NewPasswordFormValues) => {
    if (!token) {
      toast.error(t("newPassword.messages.invalidLink"));
      return;
    }

    mutate(
      {
        data: { newPassword: values.newPassword, token }
      },
      {
        onSuccess: () => {
          reset();
          navigate("/auth");
        }
      }
    );
  };

  const isTokenMissing = !token;
  const disableForm = isPending || isTokenMissing || Boolean(tokenError);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-16">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{t("newPassword.title")}</CardTitle>
          <CardDescription>{t("newPassword.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isTokenMissing || tokenError ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("newPassword.messages.tokenIssue")}
              </p>
              <Button asChild className="w-full" variant="secondary">
                <Link to="/forgot-password">{t("newPassword.buttons.backToForgot")}</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="newPassword">
                  {t("newPassword.fields.newPassword.label")}
                </Label>
                <Input id="newPassword" type="password" {...register("newPassword")} />
                {errors.newPassword ? (
                  <p className="text-sm text-destructive">{errors.newPassword.message}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {t("newPassword.fields.confirmPassword.label")}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword ? (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>
              <Button className="w-full" disabled={disableForm} type="submit">
                {isPending
                  ? t("newPassword.buttons.submitting")
                  : t("newPassword.buttons.submit")}
              </Button>
            </form>
          )}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("newPassword.messages.backToLoginPrompt")}{" "}
            <Link className="font-medium text-primary" to="/auth">
              {t("newPassword.messages.backToLogin")}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
