import { Boxes, CheckCircle2, Gauge, Sparkles } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import i18next from "~/lib/i18n";

export const meta: MetaFunction = () => {
  return [
    { title: i18next.t("landing.meta.title") },
    {
      name: "description",
      content: i18next.t("landing.meta.description")
    }
  ];
};

export const clientLoader = async () => {
  return { date: new Date() };
};

const FEATURES = [
  {
    key: "authSecurity" as const,
    icon: CheckCircle2
  },
  {
    key: "dashboardFoundation" as const,
    icon: Gauge
  },
  {
    key: "developerErgonomics" as const,
    icon: Boxes
  }
];

export default function LandingPage() {
  const { t } = useTranslation();
  const data = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col gap-24 pb-24">
      <section
        id="product"
        className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/5 via-background to-background"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-12 px-4 pt-20 pb-24 md:flex-row md:gap-20 md:px-6 md:pt-24">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              {t("landing.hero.badge")}
            </span>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
              {t("landing.hero.title")}
            </h1>
            <p className="text-base text-pretty text-muted-foreground sm:text-lg md:text-xl">
              {t("landing.hero.description")}
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <Button size="lg" asChild>
                <Link to="/auth">{t("landing.hero.primaryCta")}</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/dashboard">{t("landing.hero.secondaryCta")}</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:justify-start">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                {t("landing.hero.highlights.auth")}
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                {t("landing.hero.highlights.stack")}
              </span>
            </div>
          </div>
          <div className="relative flex h-72 w-full flex-1 items-center justify-center md:h-96">
            <div className="absolute inset-0 scale-105 rounded-3xl bg-gradient-to-tr from-primary/10 via-primary/40 to-primary/10 opacity-60 blur-3xl" />
            <div className="relative flex size-52 items-center justify-center rounded-3xl border border-primary/30 bg-background/80 shadow-2xl backdrop-blur md:size-64">
              <img
                src="/brand.svg"
                alt="Guidebook brand"
                className="h-24 w-24 md:h-28 md:w-28"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-6"
      >
        <div className="space-y-4 text-center md:max-w-2xl md:self-center md:text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {t("landing.features.title")}
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("landing.features.description")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-6" />
              </div>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-semibold">
                  {t(`landing.features.items.${key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(`landing.features.items.${key}.description`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 rounded-3xl border border-dashed border-primary/40 bg-primary/5 px-6 py-12 text-center shadow-sm sm:px-12">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {t("landing.pricing.title")}
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("landing.pricing.description")}
          </p>
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-4xl font-semibold">
              {t("landing.pricing.amount")}{" "}
              <span className="text-base font-normal text-muted-foreground">
                {t("landing.pricing.amountNote")}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {t("landing.pricing.additional")}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <a href="mailto:hello@selleo.com">{t("landing.pricing.contactCta")}</a>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <a
                href="https://github.com/Selleo/guidebook/examples/common_nestjs_remix"
                target="_blank"
                rel="noreferrer"
              >
                {t("landing.pricing.codebaseCta")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        {t("landing.footer.renderedAt", { date: data.date.toLocaleString() })}
      </p>
    </div>
  );
}
