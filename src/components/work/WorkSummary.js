import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { colors, spacing } from "../../theme/theme";

const Image = styled.section`
    min-height: 200px;
    max-height: 500px;
    height: 30vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    text-align: center;
`;

const WorkTitle = styled.h5`
    position: absolute;
    margin: 0;
    padding: ${props => props.theme.spacing.padding}rem;
    max-width: 90%;
    bottom: 0;
    color: ${props => props.theme.darkColor};
    background: ${props => props.theme.lightColor};
    font-size: 1rem;
    span {
        color: ${props => props.theme.anchor.color};
    }
`;

const Container = styled.div`
    padding: 3px;
`;

const Description = styled.div`
    height: 85px;
    color: ${colors.mediumGray};
    padding: ${spacing.padding}rem;
    background: ${colors.white};
    font-size: 0.8rem;
    position: relative;
    overflow: hidden;
    &:after {
        content: " ";
        position: absolute;
        width: 100%;
        height: 20px;
        background: linear-gradient(to bottom, transparent, ${colors.white});
        bottom: 0;
        left: 0;
    }
`;

const WorkSummary = ({ work }) => {
    //console.log(work);
    return (
        <Container>
            <Link to={work.fields.slug}>
                <Image backgroundImage={work.frontmatter.thumb}>
                    <WorkTitle>
                        {work.frontmatter.title} <span>&rarr;</span>
                    </WorkTitle>
                </Image>
            </Link>
            <Description>{work.frontmatter.outcome}</Description>
        </Container>
    );
};

export default WorkSummary;
