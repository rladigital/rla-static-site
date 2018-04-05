import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";

export const JobTemplate = ({
    content,
    contentComponent,
    title,
    helmet,
    role,
    hero
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <PageDetailContainer>
            {helmet || ""}
            <Row>
                <Column>
                    <img src={hero} alt={`${title} Profile`} />{" "}
                </Column>
            </Row>
            <Row>
                <Column>
                    <HeaderBlock textAlign="left" baseColor={colors.background}>
                        {title}
                    </HeaderBlock>
                    <h3>{role}</h3>
                </Column>
            </Row>
            <Row>
                <Column medium={6}>
                    <img src={hero} alt={`${title}`} />{" "}
                </Column>
                <Column medium={6}>
                    <PostContent content={content} />
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: job } = data;
    return (
        <JobTemplate
            helmet={<Helmet title={`Our People | ${job.frontmatter.title}`} />}
            title={job.frontmatter.title}
            content={job.html}
            role={job.frontmatter.role}
            hero={job.frontmatter.hero}
        />
    );
};

export const pageQuery = graphql`
    query JobByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                role
                tags
                hero
            }
        }
    }
`;
