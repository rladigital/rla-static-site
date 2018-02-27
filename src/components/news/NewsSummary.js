import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    position: relative;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    min-height: ${props => props.minHeight}vw;
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

const NewsSummary = ({ story, minHeight }) => {
    return (
        <Link to={story.fields.slug}>
            <SummaryContainer
                backgroundImage={story.frontmatter.hero}
                minHeight={minHeight}
            >
                <NewsTitle>
                    {story.frontmatter.title} <span>&rarr;</span>
                </NewsTitle>
            </SummaryContainer>
        </Link>
    );
};

NewsSummary.propTypes = {
    story: PropTypes.object,
    minHeight: PropTypes.number
};

NewsSummary.defaultProps = {
    minHeight: 12
};

export default NewsSummary;
