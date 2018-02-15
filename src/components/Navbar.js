import React from "react";
import Link from "gatsby-link";

import logo from "../img/rla.svg";

const Navbar = () => (
    <nav>
        <div>
            <Link to="/">
                <figure>
                    <img src={logo} alt="RLA" style={{ width: "88px" }} />
                </figure>
            </Link>
        </div>
    </nav>
);

export default Navbar;
