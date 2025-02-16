import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("modules/Landing/Landing.layout.tsx", [
    route("", "modules/Landing/Landing.page.tsx", { index: true }),
    route("about", "modules/Landing/About.page.tsx"),
    route("pokemons", "modules/Landing/Pokemons.page.tsx"),
    route("pokemons/:id", "modules/Landing/Pokemon.page.tsx"),
  ]),

  layout("modules/Dashboard/Dashboard.layout.tsx", [
    route("dashboard", "modules/Dashboard/Dashboard.page.tsx", { index: true }),
    layout("modules/Dashboard/Settings/Settings.layout.tsx", [
      route("dashboard/settings", "modules/Dashboard/Settings/Settings.page.tsx", { index: true }),
    ]),
  ]),

  layout("modules/Auth/Auth.layout.tsx", [
    route("auth/login", "modules/Auth/Login.page.tsx"),
    route("auth/register", "modules/Auth/Register.page.tsx"),
  ]),
] satisfies RouteConfig;
