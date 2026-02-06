import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            {" "}
            <NavLink to="about">
              <li>about</li>
            </NavLink>
            <NavLink to="search">
              <li>search</li>
            </NavLink>
            <NavLink to="login">
              <li>login</li>
            </NavLink>
          </ul>
        </nav>
      </header>
      <hr />
    </div>
  );
}

export default Header;
