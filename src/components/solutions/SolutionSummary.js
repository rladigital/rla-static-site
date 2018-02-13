import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    position: relative;
    background-color: ${props => props.color};
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

const  f = ({ solution }) => {
    //console.log(solution);
    return (
        <Link to={solution.frontmatter.path}>
            <SummaryContainer color={solution.frontmatter.color}>
                <SolutionTitle>
                    {solution.frontmatter.title} <span>&rarr;</span>
                </SolutionTitle>
            </SummaryContainer>
        </Link>
    );
};

export default SolutionSummary;
