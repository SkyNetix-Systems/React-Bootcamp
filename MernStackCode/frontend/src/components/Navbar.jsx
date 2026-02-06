import { Link, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("User");
    navigate("/");
  }

  return (
    <NavigationMenu className="bg-primary fixed w-screen top-0 left-0 h-20 p-2">
      <NavigationMenuList>
        {pageData.map((page) => (
          <NavigationMenuItem key={page.path}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to={page.path}>{page.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>

      {/* Logout button (not a link) */}
      <NavigationMenuLink
        className={`ml-2 bg-red-500 ${navigationMenuTriggerStyle()}`}
        onClick={handleLogout}
      >
        Log Out
      </NavigationMenuLink>
    </NavigationMenu>
  );
}
