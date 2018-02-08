import React from "react";
import Link from "gatsby-link";

import github from "../img/github-icon.svg";
import logo from "../img/rla-logo.svg";

const Navbar = () => (
    <nav>
        <div>
            <Link to="/">
                <figure>
                    <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
                </figure>
            </Link>
        </div>
    </nav>
);

export default Navbar;
