import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = () => {
  return (
    <Stack direction="row" alignItems="center" p={2}>
      {/* Left group: Logo + Links */}
      <Stack direction="row" alignItems="center" spacing={4}>
        <Link to="/">
          <img src={Logo} alt="logo" style={{ width: 48, height: 48 }} />
        </Link>

        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            fontWeight: 500,
            borderBottom: "3px solid #FF2625",
          }}
        >
          Home
        </Link>

        <a
          href="#exercises"
          style={{
            textDecoration: "none",
            color: "#3A1212",
            fontWeight: 500,
          }}
        >
          Exercises
        </a>
      </Stack>
    </Stack>
  );
};

export default Navbar;
