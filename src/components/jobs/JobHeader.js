import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { breakpoints } from "../../theme/theme";

const SummaryContainer = styled.section`
    height: 33.33vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
`;

const TitleBackground = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
`;

const TitleContainer = styled.div`
    text-align: left;
    position: absolute;
    margin: 0;
    padding: 3rem;
    width: 100%;
    bottom: 0;
`;

const Category = styled.h5`
    display: inline-block;
    padding: 0.5rem;
    color: ${props => props.theme.lightColor};
    margin-bottom: 0.5rem;
    background: ${props => props.theme.accent};
`;

const Title = styled.h3`
    margin: 0;
    max-width: 90%;
    margin-top: 0;
    color: ${props => props.theme.lightColor};
    font-weight: 900;
`;

const JobHeader = ({ title, hero, area }) => {
    return (
        <SummaryContainer backgroundImage={hero}>
            <TitleBackground>
                <TitleContainer>
                    <Category>{area}</Category>
                    <Title>{title}</Title>
                </TitleContainer>
            </TitleBackground>
        </SummaryContainer>
    );
};

export default JobHeader;
