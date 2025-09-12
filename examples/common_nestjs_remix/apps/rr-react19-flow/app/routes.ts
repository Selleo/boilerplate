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
] satisfies RouteConfig;
