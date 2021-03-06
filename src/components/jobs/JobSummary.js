import React from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";

import { getOriginalImageSrc } from "../../utils/image";
import { breakpoints, colors, spacing } from "../../theme/theme";
import { transparentize } from "../../helpers/helpers";
import Content, { HTMLContent } from "../../components/Content";

const Container = styled.section`
    height: ${props => props.height}em;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    margin-bottom: ${spacing.margin}em;
`;

const Overlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: ${transparentize("#000000", 0.3)};
`;

const TitleContainer = styled.div`
    max-width: 90%;
    padding: ${spacing.padding}em;
    color: ${props => props.theme.lightColor};
    font-weight: bold;
    a {
        color: ${props => props.theme.lightColor};
        text-decoration: underline;
    }
    ${props =>
        props.centred &&
        css`
            top: 50%;
            left: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
            text-align: center;
        `};
`;

const Category = styled.h5`
    display: inline-block;
    padding: 0.6rem 0.8rem;
    color: ${props => props.theme.lightColor};
    margin-bottom: 2rem;
    background: ${props => props.theme.accent};
    font-size: 0.8rem;
`;

const Title = styled.p`
    margin: 0;
    margin-top: 0;
    color: ${props => props.theme.lightColor};
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 1.2;
`;

const Wrapper = ({ isFreelance, href, children }) => {
    if (isFreelance) {
        return <div>{children}</div>;
    } else {
        return <Link to={href}>{children}</Link>;
    }
};

const JobSummary = ({ job, height, centred }) => {
    const isFreelance = Boolean(job.frontmatter.area === "Freelance");
    const href = job.frontmatter.description ? job.fields.slug : "/contact";

    return (
        <Wrapper isFreelance={isFreelance} href={href}>
            <Container
                backgroundImage={getOriginalImageSrc(job.frontmatter.hero)}
                height={height}>
                <Overlay>
                    <TitleContainer centred={centred}>
                        <Category>{job.frontmatter.area}</Category>
                        <Title>{job.frontmatter.title}</Title>
                        {isFreelance && (
                            <Content content={job.frontmatter.description} />
                        )}
                    </TitleContainer>
                </Overlay>
            </Container>
        </Wrapper>
    );
};

export default JobSummary;
