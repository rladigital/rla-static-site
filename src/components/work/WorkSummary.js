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

const Title = styled.h3`
    top: 50%;
    left: 50%;
    margin: 0;
    max-width: 90%;
    margin-top: 0;
    font-size: 2.6em;
    font-weight: 900;
    position: absolute;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.white};
`;

const Image = styled.section`
    height: 33.33vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

const WorkSummary = ({ work, index }) => {
    return (
        <Image backgroundImage={work.frontmatter.thumb}>
            <Overlay index={index}>
                <Title>{work.frontmatter.title}</Title>
            </Overlay>
        </Image>
    );
};

export default WorkSummary;
