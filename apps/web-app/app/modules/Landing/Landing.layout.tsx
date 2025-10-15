import { Link, Outlet } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

const NAV_SECTIONS = [
  { key: "product", to: "#product" },
  { key: "features", to: "#features" },
  { key: "pricing", to: "#pricing" },
  { key: "about", to: "/about" }
] as const;

export default function LandingLayout() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/brand.svg" alt="Boilerplate logo" className="size-8" />
            <span className="text-lg font-semibold">Boilerplate</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV_SECTIONS.map(({ key, to }) => (
              <Link
                key={key}
                to={to}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {t(`landing.layout.nav.${key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/auth">{t("landing.layout.cta.signIn")}</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">{t("landing.layout.cta.dashboard")}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <img src="/brand.svg" alt="boilerplate logo" className="size-8" />
            <p>{t("landing.layout.footer.madeWith")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {NAV_SECTIONS.map(({ key, to }) => (
              <Link key={key} to={to} className="transition hover:text-foreground">
                {t(`landing.layout.footer.${key}`)}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
