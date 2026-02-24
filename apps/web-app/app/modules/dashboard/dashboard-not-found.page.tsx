import { redirect, Link } from "react-router";
import { useTranslation } from "react-i18next";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

import type { Route } from "./+types/dashboard-not-found.page";
import { authClient } from "../Auth/auth.client";

const authMiddleware: Route.ClientMiddlewareFunction = async () => {
  const session = await authClient.getSession();

  if (!session.data) {
    throw redirect("/auth");
  }
};

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [authMiddleware];

export default function DashboardNotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("errors.dashboard.code")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4 pt-0">
        <Card className="w-full max-w-2xl border-border">
          <CardHeader>
            <CardTitle>{t("errors.dashboard.title")}</CardTitle>
            <CardDescription>{t("errors.dashboard.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/dashboard">{t("errors.actions.backToDashboard")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">{t("errors.actions.home")}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
