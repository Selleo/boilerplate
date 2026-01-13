import { useLoginUser } from "@/api/mutations/useLoginUser";
import { useRegisterUser } from "@/api/mutations/useRegisterUser";
import { SocialConnections } from "@/components/social-connections";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react-native";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  type TextInput,
  View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Image } from "./ui/image";

import type { TFunction } from "i18next";

const createSignInSchema = (t: TFunction) =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.fields.email.errors.required"))
      .email(t("auth.fields.email.errors.invalid")),
    password: z.string().min(1, t("auth.fields.password.errors.required")),
  });

const createSignUpSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string()
        .min(1, t("auth.fields.email.errors.required"))
        .email(t("auth.fields.email.errors.invalid")),
      name: z.string().min(1, t("auth.fields.name.errors.required")),
      password: z
        .string()
        .min(1, t("auth.fields.password.errors.required"))
        .min(8, t("auth.fields.password.errors.minLength")),
      confirmPassword: z
        .string()
        .min(1, t("auth.fields.confirmPassword.errors.required")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.fields.confirmPassword.errors.mismatch"),
      path: ["confirmPassword"],
    });

type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;

export function SignInForm() {
  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);
  const nameInputRef = React.useRef<TextInput>(null);

  const { t } = useTranslation();

  const loginMutation = useLoginUser();
  const registerMutation = useRegisterUser();

  const [isSignUp, setIsSignUp] = React.useState(false);

  const signInSchema = React.useMemo(() => createSignInSchema(t), [t]);
  const signUpSchema = React.useMemo(() => createSignUpSchema(t), [t]);

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  function resetForms() {
    signInForm.reset();
    signUpForm.reset();
    loginMutation.reset();
    registerMutation.reset();
  }

  function toggleMode() {
    resetForms();
    setIsSignUp(!isSignUp);
  }

  function onEmailSubmitEditing() {
    if (isSignUp) {
      nameInputRef.current?.focus();
    } else {
      passwordInputRef.current?.focus();
    }
  }

  function onNameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onPasswordSubmitEditing() {
    if (isSignUp) {
      confirmPasswordInputRef.current?.focus();
    } else {
      signInForm.handleSubmit(onSignInSubmit)();
    }
  }

  function onSignInSubmit(data: SignInFormData) {
    loginMutation.mutate({
      data: { email: data.email, password: data.password },
    });
  }

  function onSignUpSubmit(data: SignUpFormData) {
    registerMutation.mutate(
      { data: { email: data.email, password: data.password, name: data.name } },
      {
        onSuccess: () => {
          resetForms();
          setIsSignUp(false);
        },
      },
    );
  }

  const apiError =
    loginMutation.error?.message || registerMutation.error?.message;
  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <View className="gap-6">
      <View className="items-center w-full aspect-video">
        <Image
          source={require("../assets/images/prezes.jpg")}
          className="w-full h-full"
          contentFit="cover"
        />
      </View>
      <Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">
            {isSignUp ? t("auth.headings.signUp") : t("auth.headings.signIn")}
          </CardTitle>
          <CardDescription className="text-center sm:text-left">
            {isSignUp
              ? t("auth.subheadings.signUp")
              : t("auth.subheadings.signIn")}
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {apiError && (
            <Alert variant="destructive" icon={AlertCircle}>
              <AlertTitle>{t("auth.error")}</AlertTitle>
              <AlertDescription>{apiError}</AlertDescription>
            </Alert>
          )}
          {isSignUp ? (
            <View key="signup-form" className="gap-6">
              <Controller
                control={signUpForm.control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="email">
                      {t("auth.fields.email.label")}
                    </Label>
                    <Input
                      id="email"
                      placeholder={t("auth.fields.email.placeholder")}
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      onSubmitEditing={onEmailSubmitEditing}
                      returnKeyType="next"
                      submitBehavior="submit"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={signUpForm.control}
                name="name"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="name">{t("auth.fields.name.label")}</Label>
                    <Input
                      ref={nameInputRef}
                      id="name"
                      placeholder={t("auth.fields.name.placeholder")}
                      autoComplete="name"
                      autoCapitalize="words"
                      onSubmitEditing={onNameSubmitEditing}
                      returnKeyType="next"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={signUpForm.control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="password">
                      {t("auth.fields.password.label")}
                    </Label>
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      secureTextEntry
                      returnKeyType="next"
                      onSubmitEditing={onPasswordSubmitEditing}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={signUpForm.control}
                name="confirmPassword"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="confirmPassword">
                      {t("auth.fields.confirmPassword.label")}
                    </Label>
                    <Input
                      ref={confirmPasswordInputRef}
                      id="confirmPassword"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={signUpForm.handleSubmit(onSignUpSubmit)}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Button
                className="w-full"
                onPress={signUpForm.handleSubmit(onSignUpSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text>{t("auth.buttons.signUp")}</Text>
                )}
              </Button>
            </View>
          ) : (
            <View key="signin-form" className="gap-6">
              <Controller
                control={signInForm.control}
                name="email"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <Label htmlFor="email">
                      {t("auth.fields.email.label")}
                    </Label>
                    <Input
                      id="email"
                      placeholder={t("auth.fields.email.placeholder")}
                      keyboardType="email-address"
                      autoComplete="email"
                      autoCapitalize="none"
                      onSubmitEditing={onEmailSubmitEditing}
                      returnKeyType="next"
                      submitBehavior="submit"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Controller
                control={signInForm.control}
                name="password"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <View className="gap-1.5">
                    <View className="flex-row items-center">
                      <Label htmlFor="password">
                        {t("auth.fields.password.label")}
                      </Label>
                      <Button
                        variant="link"
                        size="sm"
                        className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
                        onPress={() => {
                          // TODO: Navigate to forgot password screen
                        }}
                      >
                        <Text className="font-normal leading-4">
                          {t("auth.buttons.forgotPassword")}
                        </Text>
                      </Button>
                    </View>
                    <Input
                      ref={passwordInputRef}
                      id="password"
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={signInForm.handleSubmit(onSignInSubmit)}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      editable={!isLoading}
                    />
                    {error && (
                      <Text className="text-sm text-destructive">
                        {error.message}
                      </Text>
                    )}
                  </View>
                )}
              />
              <Button
                className="w-full"
                onPress={signInForm.handleSubmit(onSignInSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text>{t("auth.buttons.signIn")}</Text>
                )}
              </Button>
            </View>
          )}
          <View className="text-center text-sm flex-row justify-center items-center">
            <Text>
              {isSignUp
                ? t("auth.links.hasAccount") + " "
                : t("auth.links.noAccount") + " "}
            </Text>
            <Pressable onPress={toggleMode}>
              <Text className="text-sm underline underline-offset-4">
                {isSignUp ? t("auth.links.signIn") : t("auth.links.signUp")}
              </Text>
            </Pressable>
          </View>
          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="text-muted-foreground px-4 text-sm">
              {t("auth.divider")}
            </Text>
            <Separator className="flex-1" />
          </View>
          <SocialConnections />
        </CardContent>
      </Card>
    </View>
  );
}
