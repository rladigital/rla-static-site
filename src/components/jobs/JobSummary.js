import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { breakpoints } from "../../theme/theme";

const SummaryContainer = styled.section`
    height: 33.33vw;
    position: relative;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
`;

const TitleBackground = styled.div`
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

const TitleContainer = styled.div`
    text-align: left;
    position: absolute;
    margin: 0;
    padding: 3rem;
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
    color: ${props => props.theme.lightColor};
    font-weight: 900;
`;

const JobSummary = ({ job }) => {
    return (
        <Link to={job.fields.slug}>
            <SummaryContainer backgroundImage={job.frontmatter.hero}>
                <TitleBackground>
                    <TitleContainer>
                        <Category>{job.frontmatter.area}</Category>
                        <Title>{job.frontmatter.title}</Title>
                    </TitleContainer>
                </TitleBackground>
            </SummaryContainer>
        </Link>
    );
};

export default JobSummary;
