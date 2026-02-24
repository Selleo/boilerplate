import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 p-6">
      <Card className="w-full max-w-lg border-border">
        <CardHeader className="space-y-3 text-center">
          <img src="/brand.svg" alt="Boilerplate logo" className="mx-auto size-10" />
          <p className="text-sm font-medium text-muted-foreground">
            {t("errors.global.code")}
          </p>
          <CardTitle className="text-2xl md:text-3xl">
            {t("errors.global.title")}
          </CardTitle>
          <CardDescription>{t("errors.global.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to="/">{t("errors.actions.home")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/dashboard">{t("errors.actions.dashboard")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
