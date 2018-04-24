import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { colors, spacing, breakpoints } from "../theme/theme";
import { navigation } from "../utils/config";
import SiteNav from "./SiteNav";
import SiteNavLink from "./SiteNavLink";

const HeaderContainer = styled.div`
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    color: ${colors.background};
    padding: 2rem 1rem;
    z-index: 4;
    text-align: right;
    display: none;
    @media (min-width: ${breakpoints.medium}px) {
        display: block;
    }
`;

const SiteHeader = () => (
    <HeaderContainer>
        <Row expanded>
            <Column>
                <SiteNav>
                    {navigation.map((item, index) => {
                        return (
                            <SiteNavLink key={index} to={item.to}>
                                {item.text}
                            </SiteNavLink>
                        );
                    })}
                </SiteNav>
            </Column>
        </Row>
    </HeaderContainer>
);

export default SiteHeader;
