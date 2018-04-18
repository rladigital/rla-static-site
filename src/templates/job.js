import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";
import JobHeader from "../components/jobs/JobHeader";
import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";

const SummaryContainer = styled.section`
    padding: 10px;
    background: #ebebeb;
    div {
        margin: 0.3em 0;
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
        skills,
        hero,
        level,
        salary,
        hours,
        benefits,
        closing
    } = props;
    const PostContent = contentComponent || Content;

    return (
        <PageDetailContainer>
            {helmet || ""}
            <BackButton to="/careers" />
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
                    <Column medium={7} className="cms-content">
                        <PostContent content={description} />
                        {skills && [
                            <h1>Key Skills</h1>,
                            <ul>
                                {skills.map((skill, index) => {
                                    return <li key={index}>{skill}</li>;
                                })}
                            </ul>
                        ]}
                    </Column>
                    <Column medium={1}>&nbsp;</Column>
                    <Column medium={4}>
                        <SummaryContainer>
                            <Row>
                                <Column small={6}>
                                    <h5>Level:</h5>
                                </Column>
                                <Column small={6}>{level}</Column>
                            </Row>
                            <Row>
                                <Column small={6}>
                                    <h5>Salary:</h5>
                                </Column>
                                <Column small={6}>{salary}</Column>
                            </Row>
                            <Row>
                                <Column small={6}>
                                    <h5>Hours:</h5>
                                </Column>
                                <Column small={6}>{hours}</Column>
                            </Row>
                            <Row>
                                <Column small={6}>
                                    <h5>Benefits:</h5>
                                </Column>
                                <Column small={6}>
                                    {benefits.map((benefit, index) => {
                                        return <div key={index}>{benefit}</div>;
                                    })}
                                </Column>
                            </Row>
                            <Row>
                                <Column small={6}>
                                    <h5>Closing:</h5>
                                </Column>
                                <Column small={6}>{closing}</Column>
                            </Row>
                        </SummaryContainer>
                    </Column>
                </Row>
            </JobContainer>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: job } = data;
    return (
        <JobTemplate
            helmet={<Helmet title={`Careers | ${job.frontmatter.title}`} />}
            title={job.frontmatter.title}
            area={job.frontmatter.area}
            content={job.html}
            description={job.frontmatter.description}
            skills={job.frontmatter.skills}
            hero={job.frontmatter.hero}
            level={job.frontmatter.level}
            salary={job.frontmatter.salary}
            hours={job.frontmatter.hours}
            benefits={job.frontmatter.benefits}
            closing={job.frontmatter.closing}
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
                skills
                area
                tags
                hero
                level
                salary
                hours
                benefits
                closing
            }
        }
    }
`;
