import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, redirect, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useLoginUser } from "~/api/mutations/useLoginUser";
import { useRegisterUser } from "~/api/mutations/useRegisterUser";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { authClient } from "./auth.client";
import { useLoginGoogle } from "~/api/mutations/useLoginGoogle";
import { toast } from "sonner";

const createLoginSchema = (t: TFunction) =>
  z.object({
    email: z.email({ message: t("auth.fields.email.errors.invalid") }),
    password: z.string().min(8, { message: t("auth.fields.password.errors.minLength") })
  });

const createRegisterSchema = (t: TFunction) =>
  createLoginSchema(t)
    .extend({
      name: z.string().min(3, { message: t("auth.fields.name.errors.minLength") }),
      confirmPassword: z.string().min(8, {
        message: t("auth.fields.confirmPassword.errors.minLength")
      })
    })
    .refine((val) => val.password === val.confirmPassword, {
      message: t("auth.fields.confirmPassword.errors.mismatch"),
      path: ["confirmPassword"]
    });

type LoginFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export async function clientLoader() {
  const session = await authClient.getSession();

  if (session?.data) {
    throw redirect("/dashboard");
  }
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: loginUser } = useLoginUser();
  const { mutateAsync: loginGoogle } = useLoginGoogle();
  const { mutateAsync: registerUser } = useRegisterUser();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [searchParams] = useSearchParams();

  const loginSchema = React.useMemo(() => createLoginSchema(t), [t]);
  const registerSchema = React.useMemo(() => createRegisterSchema(t), [t]);

  const resolver = React.useMemo(
    () => zodResolver(isSignUp ? registerSchema : loginSchema),
    [isSignUp, loginSchema, registerSchema]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormValues>({ resolver });

  const onSubmit = (data: LoginFormValues) => {
    if (isSignUp) {
      registerUser({
        data: {
          email: data.email,
          password: data.password,
          name: data.name ?? ""
        }
      }).then(() => {
        reset();
        setIsSignUp(false);
      });
    } else {
      loginUser({ data: { email: data.email, password: data.password } }).then(() => {
        navigate("/dashboard");
      });
    }
  };

  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified === "true") {
      toast(t("auth.toast.verified.title"), {
        description: t("auth.toast.verified.description"),
        position: "top-center"
      });
      navigate("/auth", {
        replace: true
      });
    }
  }, [verified, navigate, t]);

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {t(`auth.headings.${isSignUp ? "register" : "login"}`)}
                </h1>
                <p className="text-balance text-muted-foreground">
                  {t(`auth.subheadings.${isSignUp ? "register" : "login"}`)}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("auth.fields.email.label")}</Label>
                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("auth.fields.email.placeholder")}
                    className={cn({ "border-red-500": errors.email })}
                    {...register("email")}
                    required
                  />
                  {errors.email?.message && (
                    <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              {isSignUp && (
                <div className="grid gap-2">
                  <Label htmlFor="name">{t("auth.fields.name.label")}</Label>
                  <div>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("auth.fields.name.placeholder")}
                      className={cn({ "border-red-500": errors.name })}
                      {...register("name")}
                      required={isSignUp}
                    />
                    {errors.name?.message && (
                      <p className="mt-0.5 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                </div>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("auth.fields.password.label")}</Label>
                </div>
                <div>
                  <Input
                    id="password"
                    type="password"
                    className={cn({ "border-red-500": errors.password })}
                    {...register("password")}
                    required
                  />
                  {errors.password?.message && (
                    <p className="mt-0.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              {isSignUp && (
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">
                    {t("auth.fields.confirmPassword.label")}
                  </Label>
                  <div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className={cn({
                        "border-red-500": errors.confirmPassword
                      })}
                      {...register("confirmPassword")}
                      required={isSignUp}
                    />
                    {errors.confirmPassword?.message && (
                      <p className="mt-0.5 text-xs text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full">
                {t(`auth.buttons.primary.${isSignUp ? "register" : "login"}`)}
              </Button>
              <Link
                to="/forgot-password"
                className="text-center text-sm underline-offset-2 hover:underline"
              >
                {t("auth.links.forgotPassword")}
              </Link>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                  {t("auth.continueWith")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={() => {
                    loginGoogle();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">{t("auth.buttons.google")}</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <rect x="1" y="1" width="10" height="10" fill="currentColor" />
                    <rect x="13" y="1" width="10" height="10" fill="currentColor" />
                    <rect x="1" y="13" width="10" height="10" fill="currentColor" />
                    <rect x="13" y="13" width="10" height="10" fill="currentColor" />
                  </svg>
                  <span className="sr-only">{t("auth.buttons.microsoft")}</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                {isSignUp ? (
                  <>
                    {t("auth.links.toggle.hasAccount")}{" "}
                    <button
                      type="button"
                      className="underline underline-offset-4"
                      onClick={() => setIsSignUp(false)}
                    >
                      {t("auth.links.toggle.signIn")}
                    </button>
                  </>
                ) : (
                  <>
                    {t("auth.links.toggle.noAccount")}{" "}
                    <button
                      type="button"
                      className="underline underline-offset-4"
                      onClick={() => setIsSignUp(true)}
                    >
                      {t("auth.links.toggle.signUp")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/prezes.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        {t("auth.links.agreement.prefix")}{" "}
        <a href="#">{t("auth.links.agreement.terms")}</a> {t("auth.links.agreement.and")}{" "}
        <a href="#">{t("auth.links.agreement.privacy")}</a>.
      </div>
    </div>
  );
}
