import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "gatsby-link";

import { getOriginalImageSrc } from "../../utils/image";
import { transparentize } from "../../helpers/helpers";
import { colors, breakpoints } from "../../theme/theme";

const SummaryContainer = styled.section`
    position: relative;
    height: ${props => props.height}px;
    text-align: center;
    overflow: hidden;
    &:hover {
        .news-image {
            transform: scale(1.05);
        }
    }
`;

const Image = styled.div`
    width: 100%;
    height: 100%;

    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    transition: transform 0.25s ease;
`;

const TitleBackground = styled.div`
    position: absolute;
    margin: 0;
    width: 100%;
    height: 50%;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        ${transparentize(colors.background, 0.5)} 100%
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
    font-size: 1.2em;
    color: ${props => props.theme.lightColor};
`;

const NewsSummary = ({ story, height }) => {
    //console.log(story);
    return (
        <Link to={story.fields.slug}>
            <SummaryContainer height={height}>
                <Image
                    className="news-image"
                    backgroundImage={getOriginalImageSrc(
                        story.frontmatter.thumb
                    )}
                >
                    {" "}
                </Image>
                <TitleBackground>
                    <TitleContainer>
                        <Category>{story.frontmatter.category}</Category>
                        <Title>{story.frontmatter.title}</Title>
                    </TitleContainer>
                </TitleBackground>
            </SummaryContainer>
        </Link>
    );
};

NewsSummary.propTypes = {
    story: PropTypes.object,
    minHeight: PropTypes.number
};

NewsSummary.defaultProps = {
    minHeight: 12,
    height: 360
};

export default NewsSummary;
