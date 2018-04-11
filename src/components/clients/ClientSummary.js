import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { colors, breakpoints } from "../../theme/theme";

const SummaryContainer = styled.section`
    height: 33.33vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
`;

const TitleBackground = styled.div`
    position: absolute;
    margin: 0;
    width: 100%;
    min-height: 35%;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        ${colors.background} 90%
    );
`;

const TitleContainer = styled.div`
    text-align: left;
    position: absolute;
    margin: 0;
    padding: 2.2rem;
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

const ClientSummary = ({ client }) => {
    return (
        <Link to={client.fields.slug}>
            <SummaryContainer backgroundImage={client.frontmatter.thumb}>
                <TitleBackground>
                    <TitleContainer>
                        <Title>{client.frontmatter.title}</Title>
                    </TitleContainer>
                </TitleBackground>
            </SummaryContainer>
        </Link>
    );
};

export default ClientSummary;
