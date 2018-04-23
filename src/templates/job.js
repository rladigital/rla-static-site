import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";
import FAIcon from "@fortawesome/react-fontawesome";

import { dateFormat } from "../helpers/helpers";
import { spacing, colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";
import JobHeader from "../components/jobs/JobHeader";
import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";

const SummaryContainer = styled.section`
    padding: ${spacing.padding}em ${spacing.padding}em 0;
    background: #ebebeb;
    margin-bottom: ${spacing.margin}em;
    p {
        margin: 0 0 0.8em;
    }
`;
const JobContainer = styled.section`
    margin-top: 2rem;
`;

export const JobTemplate = props => {
    const {
        content,
        contentComponent,
        title,
        area,
        helmet,
        description,
        hero,
        level,
        location,
        salary,
        hours,
        benefits,
        closing,
        transition,
        history
    } = props;
    const PostContent = contentComponent || Content;

    return (
        <PageDetailContainer style={transition && transition.style}>
            {helmet || ""}
            <BackButton goBack={history.goBack} />
            {hero && (
                <Row>
                    <Column>
                        <Hero src={hero}>
                            <JobHeader area={area} title={title} hero={hero} />
                        </Hero>
                    </Column>
                </Row>
            )}
            <JobContainer>
                <Row>
                    <Column large={7} className="cms-content">
                        <PostContent content={description} />
                    </Column>
                    <Column large={1}>&nbsp;</Column>
                    <Column large={4}>
                        <SummaryContainer>
                            <SummaryItem label="Level:">{level}</SummaryItem>
                            <SummaryItem label="Salary:">{salary}</SummaryItem>
                            <SummaryItem label="Hours:">{hours}</SummaryItem>
                            <SummaryItem label="Location:">
                                {location}
                            </SummaryItem>
                            <SummaryItem label="Benefits:">
                                {benefits.map((benefit, index) => {
                                    return <p key={index}>{benefit}</p>;
                                })}
                            </SummaryItem>
                            <SummaryItem label="Closing:">
                                {dateFormat(closing)}
                            </SummaryItem>
                        </SummaryContainer>
                        <a href="mailto:careers@rla.co.uk">
                            <Button
                                size="large"
                                hollow
                                color="background"
                                borderWidth={3}
                                padding={2}
                            >
                                Apply for this job <FAIcon icon="arrow-right" />
                            </Button>
                        </a>
                    </Column>
                </Row>
            </JobContainer>
        </PageDetailContainer>
    );
};

const SummaryItem = ({ label, children }) => (
    <Row>
        <Column large={6} xlarge={4} collapse>
            <h5>{label}</h5>
        </Column>
        <Column large={6} xlarge={8} collapse>
            {children}
        </Column>
    </Row>
);

export default ({ history, transition, data }) => {
    //console.log(data);
    const { markdownRemark: job } = data;
    return (
        <JobTemplate
            helmet={<Helmet title={`Careers | ${job.frontmatter.title}`} />}
            title={job.frontmatter.title}
            area={job.frontmatter.area}
            content={job.html}
            description={job.frontmatter.description}
            hero={job.frontmatter.hero}
            level={job.frontmatter.level}
            location={job.frontmatter.location}
            salary={job.frontmatter.salary}
            hours={job.frontmatter.hours}
            benefits={job.frontmatter.benefits}
            closing={job.frontmatter.closing}
            transition={transition}
            history={history}
        />
    );
};

export const pageQuery = graphql`
    query JobByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                description
                area
                tags
                hero
                level
                location
                salary
                hours
                benefits
                closing
            }
        }
    }
`;
