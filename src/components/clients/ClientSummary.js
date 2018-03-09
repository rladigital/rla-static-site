import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    height: ${props => props.height}vw;
    position: relative;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 150px;
    text-align: center;
`;

const ClientTitle = styled.h5`
    position: absolute;
    margin: 0;
    padding: 0.5rem;
    max-width: 90%;
    bottom: 0;
    color: ${props => props.theme.darkColor};
    background: ${props => props.theme.lightColor};
    font-size: 0.8rem;
    z-index: 2;
    span {
        color: ${props => props.theme.anchor.color};
    }
`;

// const ClientTitle = styled.div`
//     left: 0;
//     bottom: 0;
//     z-index: 1;
//     font-size: 22px;
//     font-weight: 900;
//     position: absolute;
//     text-transform: uppercase;
//     color: ${props => props.theme.lightColor};
//     padding: ${props => props.theme.spacing.padding}em;
// `;

const ClientSummary = ({ client, height }) => {
    return (
        <Link to={client.fields.slug}>
            <SummaryContainer
                backgroundImage={client.frontmatter.logo}
                height={height}
            >
                <ClientTitle>
                    {client.frontmatter.title} <span>&rarr;</span>
                </ClientTitle>
            </SummaryContainer>
        </Link>
    );
};

export default ClientSummary;
