import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetPassword } from "~/api/mutations/useResetPassword";
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
import { toast } from "sonner";

const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
  });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

export default function NewPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = searchParams.get("error");
  const { mutate, isPending } = useResetPassword();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (values: NewPasswordFormValues) => {
    if (!token) {
      toast.error("Link do resetu hasła wygasł lub jest nieprawidłowy.");
      return;
    }

    mutate(
      {
        data: { newPassword: values.newPassword, token },
      },
      {
        onSuccess: () => {
          reset();
          navigate("/auth");
        },
      },
    );
  };

  const isTokenMissing = !token;
  const disableForm = isPending || isTokenMissing || Boolean(tokenError);

  return (
    <div className="bg-muted flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Ustaw nowe hasło</CardTitle>
          <CardDescription>
            Wpisz nowe hasło do konta, aby odzyskać dostęp. Hasło powinno mieć
            co najmniej 8 znaków.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isTokenMissing || tokenError ? (
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Link resetujący jest nieprawidłowy lub wygasł. Poproś o nowy
                link.
              </p>
              <Button asChild className="w-full" variant="secondary">
                <Link to="/forgot-password">Wróć do resetu hasła</Link>
              </Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nowe hasło</Label>
                <Input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                />
                {errors.newPassword ? (
                  <p className="text-destructive text-sm">
                    {errors.newPassword.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Powtórz hasło</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword ? (
                  <p className="text-destructive text-sm">
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>
              <Button className="w-full" disabled={disableForm} type="submit">
                {isPending ? "Zapisywanie..." : "Zapisz nowe hasło"}
              </Button>
            </form>
          )}
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Wróć do logowania?{" "}
            <Link className="text-primary font-medium" to="/auth">
              Zaloguj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
