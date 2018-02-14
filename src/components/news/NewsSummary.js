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

const NewsTitle = styled.h5`
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

const NewsSummary = ({ story }) => {
    console.log(story);
    return (
        <Link to={story.fields.slug}>
            <SummaryContainer backgroundImage={story.frontmatter.hero}>
                <NewsTitle>
                    {story.frontmatter.title} <span>&rarr;</span>
                </NewsTitle>
            </SummaryContainer>
        </Link>
    );
};

export default NewsSummary;
