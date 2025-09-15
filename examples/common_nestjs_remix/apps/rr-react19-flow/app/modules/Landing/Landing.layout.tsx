import { Link, Outlet } from "react-router";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";

export default function LandingLayout() {
  return (
    <main className="p-4 relative">
      <h1 className="text-3xl text-center">Welcome to Selleo Remix Template</h1>
      <div className="justify-center flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/auth/login" className={navigationMenuTriggerStyle()}>
                Login
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <Outlet />
    </main>
  );
}
