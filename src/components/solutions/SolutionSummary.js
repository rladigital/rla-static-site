import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    position: relative;
    background: linear-gradient(
        164.17deg,
        ${props => props.color1} 0%,
        ${props => props.color2} 100%
    );
    min-height: 150px;
    text-align: center;
`;

const SolutionTitle = styled.h5`
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

const SolutionSummary = ({ solution }) => {
    //console.log(solution);
    return (
        <Link to={solution.fields.slug}>
            <SummaryContainer {...solution.frontmatter}>
                <SolutionTitle>
                    {solution.frontmatter.title} <span>&rarr;</span>
                </SolutionTitle>
            </SummaryContainer>
        </Link>
    );
};

export default SolutionSummary;
