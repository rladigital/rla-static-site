import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    position: relative;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    min-height: 150px;
    text-align: center;
`;

const WorkTitle = styled.h5`
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

const WorkSummary = ({ work }) => {
    //console.log(work);
    return (
        <Link to={work.fields.slug}>
            <SummaryContainer backgroundImage={work.frontmatter.thumb}>
                <WorkTitle>
                    {work.frontmatter.title} <span>&rarr;</span>
                </WorkTitle>
            </SummaryContainer>{" "}
        </Link>
    );
};

export default WorkSummary;
