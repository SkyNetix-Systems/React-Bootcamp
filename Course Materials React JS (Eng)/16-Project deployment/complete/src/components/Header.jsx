import { NavLink } from "react-router-dom";
import NavMenuLink from "../UI/NavLinkMenu";
import logo from "../assets/images/logo.svg";

function Header() {
  return (
    <header className="flex justify-between px-5 py-8 bg-blue-200 shadow-md">
      <img className="h-6" src={logo} alt="logo" />

      <nav>
        <ul className="flex gap-14">
          <li>
            <NavMenuLink to={"/"}>Home</NavMenuLink>
          </li>
          <li>
            <NavMenuLink to={"/about"}>About</NavMenuLink>
          </li>
          <li>
            <NavMenuLink to={"/cart"}>Cart</NavMenuLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
