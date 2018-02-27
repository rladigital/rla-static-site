import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    height: ${props => props.height}px;
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
    span {
        color: ${props => props.theme.anchor.color};
    }
`;

const ClientSummary = ({ client, height }) => {
    console.log(client);
    return (
        <Link to={client.fields.slug}>
            <SummaryContainer
                backgroundImage={client.frontmatter.hero}
                height={height}
            >
                <ClientTitle>
                    {client.frontmatter.title} <span>&rarr;</span>
                </ClientTitle>
            </SummaryContainer>{" "}
        </Link>
    );
};

export default ClientSummary;
