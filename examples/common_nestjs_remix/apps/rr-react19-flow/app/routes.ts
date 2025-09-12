import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("modules/Landing/Landing.layout.tsx", [
    route("", "modules/Landing/Landing.page.tsx", { index: true }),
    route("about", "modules/Landing/About.page.tsx"),
    route("pokemons", "modules/Landing/Pokemons.page.tsx"),
    route("pokemons/:id", "modules/Landing/Pokemon.page.tsx"),
  ]),
  layout("modules/Auth/Auth.layout.tsx", [
    route("auth/login", "modules/Auth/Login.page.tsx"),
    route("auth/register", "modules/Auth/Register.page.tsx"),
  ]),
  route(
    "/.well-known/appspecific/com.chrome.devtools.json",
    "modules/dev/dev-null.tsx",
  ),
] satisfies RouteConfig;
