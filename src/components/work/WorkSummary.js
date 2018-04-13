import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { colors, spacing } from "../../theme/theme";
import { transparentize } from "../../helpers/helpers";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    position: relative;
    text-align: center;
    opacity: 0;
    transform: scale(1.2);
    transition: opacity 1s ease, transform 0.5s ease;

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

const ContentContainer = styled.div`
    top: 50%;
    left: 50%;
    margin: 0;
    max-width: 90%;
    margin-top: 0;
    position: absolute;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.white};
`;

const Title = styled.h3`
    font-size: 2.6em;
    font-weight: 900;
`;

const Image = styled.section`
    height: 33.33vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    overflow: hidden;
    cursor: pointer;
`;

const Summary = styled.p`
    font-size: 0.8vw;
`;

const WorkSummary = ({ work, index }) => {
    return (
        <Image backgroundImage={work.frontmatter.thumb}>
            <Overlay index={index}>
                <ContentContainer>
                    <Title>{work.frontmatter.title}</Title>
                    {work.frontmatter.outcome && (
                        <Summary>
                            {work.frontmatter.outcome.substring(0, 200)}...
                        </Summary>
                    )}
                </ContentContainer>
            </Overlay>
        </Image>
    );
};

export default WorkSummary;
