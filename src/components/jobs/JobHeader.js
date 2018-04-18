import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { breakpoints, spacing } from "../../theme/theme";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.8);
    padding: ${spacing.padding}em;
`;

const Category = styled.h5`
    display: inline-block;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.lightColor};
    background: ${props => props.theme.accent};
`;

const Title = styled.h2`
    margin: 0;
    font-weight: 900;
    text-align: center;
    color: ${props => props.theme.lightColor};
    @media (min-width: ${breakpoints.xlarge}px) {
        font-size: 2.3rem;
    }
`;

const TitleContainer = styled.div`
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    width: 90%;
    @media (min-width: ${breakpoints.xlarge}px) {
        width: 80%;
    }
`;

const JobHeader = ({ title, hero, area }) => {
    return (
        <Overlay>
            <Category>{area}</Category>
            <TitleContainer>
                <Title>{title}</Title>
            </TitleContainer>
        </Overlay>
    );
};

export default JobHeader;
