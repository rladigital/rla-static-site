import React from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";

import { getOriginalImageSrc } from "../../utils/image";
import { colors, spacing, breakpoints } from "../../theme/theme";
import { transparentize } from "../../helpers/helpers";

const Container = styled.div`
    overflow: hidden;
    height: 100vw;
    ${props =>
        props.heightMediaQuery
            ? css`
                  ${props.heightMediaQuery};
              `
            : css`
                  height: 33.33vw;
              `};
`;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    opacity: 0;
    transform: scale(1.2);
    transition: opacity 0.5s ease, transform 0.25s ease;

    background: ${props =>
        transparentize(
            props.index % 2 ? colors.accent : colors.background,
            0.52
        )};

    &:hover {
        opacity: 1;
        transform: scale(1);
    }
`;

const Content = styled.div`
    top: 50%;
    left: 50%;
    margin: 0;
    max-width: 90%;
    width: 100%;
    margin-top: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    color: ${props => colors.white};
`;

const Title = styled.h3`
    font-size: 9vw;
    font-weight: 800;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 3vw;
    }
`;

const Image = styled.section`
    height: 100%;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: ${props => props.alignment};
    overflow: hidden;
    transition: transform 0.25s ease;
    &:hover{
        transform: scale(1.05);
    }
`;

const Summary = styled.p`
    font-size: 3vw;
    margin-bottom: 0;
    font-weight: bold;
    font-family: Avenir, sans-serif;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: 2vw;
    }
    @media (min-width: ${breakpoints.large}px) {
        font-size: 0.9vw;
    }
`;

const WorkSummaryWrapper = ({ children, slug, previewType }) => {
    switch (previewType) {
        case "page":
            return <Link to={slug}>{children}</Link>;
            break;
        default:
            return children;
    }
};

const WorkSummary = ({ work, index, heightMediaQuery }) => {
    return (
        <WorkSummaryWrapper
            slug={work.fields.slug}
            previewType={work.frontmatter.previewType}
        >
            <Container heightMediaQuery={heightMediaQuery}>
                <Image
                    backgroundImage={getOriginalImageSrc(
                        work.frontmatter.thumb
                    )}
                    alignment={work.frontmatter.thumbnailAlignment}
                >
                    <Overlay index={index}>
                        <Content>
                            <Title>{work.frontmatter.title}</Title>
                            {work.frontmatter.excerpt && (
                                <Summary>{work.frontmatter.excerpt}</Summary>
                            )}
                        </Content>
                    </Overlay>
                </Image>
            </Container>
        </WorkSummaryWrapper>
    );
};

export default WorkSummary;
