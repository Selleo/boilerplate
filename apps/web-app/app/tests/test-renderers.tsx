import React, { type PropsWithChildren, type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsTestingAdapter } from "nuqs/adapters/testing";
import { I18nextProvider } from "react-i18next";
import i18n from "~/lib/i18n";

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

interface RenderWithOptions {
  withTheme?: boolean;
  withQuery?: boolean;
  withNuqs?: boolean;
  withi18n?: boolean;
  searchParams?: Record<string, string>;
}

class TestRenderer {
  private providers: React.FC<{ children: React.ReactNode }>[] = [];
  private providerOptions: Record<string, Record<string, unknown>> = {
    MockThemeProvider: {},
    QueryProvider: {},
    NuqsTestingAdapter: {},
    I18nextProvider: { i18n }
  };

  withTheme() {
    this.providers.push(MockThemeProvider);
    return this;
  }

  withQuery() {
    this.providers.push(QueryProvider);
    return this;
  }

  withNuqs(searchParams?: Record<string, string>) {
    this.providers.push(NuqsTestingAdapter);
    this.providerOptions[NuqsTestingAdapter.name] = { searchParams };
    return this;
  }

  withi18n() {
    //@ts-expect-error missing props but we add them dymanically
    this.providers.push(I18nextProvider);
    return this;
  }

  render(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
    const AllProviders = ({ children }: PropsWithChildren) => (
      <>
        {this.providers.reduceRight(
          (acc, Provider) => (
            <Provider {...this.providerOptions[Provider.name]}>{acc}</Provider>
          ),
          children
        )}
      </>
    );

    return render(ui, { wrapper: AllProviders, ...options });
  }
}

export const renderWith = (options: RenderWithOptions = {}) => {
  const renderer = new TestRenderer();

  if (options.withTheme) {
    renderer.withTheme();
  }

  if (options.withQuery) {
    renderer.withQuery();
  }

  if (options.withNuqs) {
    renderer.withNuqs(options.searchParams);
  }

  return renderer;
};
