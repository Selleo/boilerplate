import { useTranslation } from "react-i18next";
import type { MetaFunction } from "react-router";
import i18next from "~/lib/i18n";

export const meta: MetaFunction = () => {
  return [{ title: i18next.t("about.metaTitle") }];
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("about.heading")}</h1>
    </div>
  );
}
