import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRequestPasswordReset } from "~/api/mutations/useRequestPasswordReset";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { mutate, isPending } = useRequestPasswordReset();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(
      {
        data: { email: values.email },
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Odzyskaj dostęp</CardTitle>
          <CardDescription>
            Podaj adres email powiązany z Twoim kontem. Jeśli konto istnieje,
            wyślemy instrukcję resetu hasła.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email ? (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? "Wysyłanie..." : "Wyślij link resetujący"}
            </Button>
          </form>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Pamiętasz hasło?{" "}
            <Link className="text-primary font-medium" to="/auth">
              Wróć do logowania
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
