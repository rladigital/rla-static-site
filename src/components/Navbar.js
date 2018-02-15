import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import logo from "../img/rla.svg";

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
`;

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
