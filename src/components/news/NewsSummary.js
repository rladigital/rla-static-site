import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "gatsby-link";

import { breakpoints } from "../../theme/theme";

const SummaryContainer = styled.section`
    position: relative;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    min-height: 80vw;
    text-align: center;

    @media (min-width: ${breakpoints.medium}px) {
        min-height: ${props => props.minHeight}vw;
    }
`;

const NewsTitleBackground = styled.div`
    position: absolute;
    margin: 0;
    width: 100%;
    min-height: 35%;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.9) 90%
    );
`;
const NewsTitleContainer = styled.div`
    text-align: left;
    position: absolute;
    margin: 0;
    width: 100%;
    bottom: 0;
`;
const NewsCategory = styled.h5`
    display: inline-block;
    margin-left: 0.5rem;
    padding: 0.5rem;
    color: ${props => props.theme.lightColor};
    background: ${props => props.theme.accent};
`;
const NewsTitle = styled.h3`
    margin: 0;
    padding: 0.5rem;
    max-width: 90%;
    color: ${props => props.theme.lightColor};
`;

const NewsSummary = ({ story, minHeight }) => {
    //console.log(story);
    return (
        <Link to={story.fields.slug}>
            <SummaryContainer
                backgroundImage={story.frontmatter.thumb}
                minHeight={minHeight}
            >
                <NewsTitleBackground>
                    <NewsTitleContainer>
                        <NewsCategory>
                            {story.frontmatter.category}
                        </NewsCategory>
                        <NewsTitle>{story.frontmatter.title}</NewsTitle>
                    </NewsTitleContainer>
                </NewsTitleBackground>
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
