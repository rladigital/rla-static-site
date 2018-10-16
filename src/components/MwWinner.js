import React from "react";
import Link from "gatsby-link";
import styled, { ThemeProvider, withTheme } from "styled-components";

import banner from "../img/mw-winner.png";

const Container = styled.div`
    top: ${props => props.top};
    transform: translateY(-50%);
    left: 0;
    position: fixed;
    z-index: 8;
`;

const Img = styled.img`
    width: 160px;
    @media only screen and (max-width: ${props =>
            props.theme.breakpoints.xlarge}px) {
        width: 90px;
    }
`;

const MwWinner = ({ top }) => (
    <Container top={top}>
        <Link to="#">
            <Img
                src={banner}
                alt="Marketing Week Masters 2018 Automotive Winner"
            />
        </Link>
    </Container>
);

export default withTheme(MwWinner);
