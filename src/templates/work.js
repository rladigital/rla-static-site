import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import HeaderBlock from "../components/HeaderBlock";

export const WorkTemplate = ({
    content,
    logo,
    hero,
    project,
    outcome,
    galleryImages,
    solutions,
    title,
    intro,
    helmet
}) => {
    //console.log(project, outcome);
    return (
        <PageDetailContainer>
            {helmet || ""}
            <Row>
                <Column>
                    <img
                        style={{ borderRadius: "5px" }}
                        src={hero}
                        alt={`${title} Logo`}
                    />
                </Column>
            </Row>
            <Row>
                <Column>
                    <HeaderBlock textAlign="left" baseColor={colors.background}>
                        {title}
                    </HeaderBlock>
                </Column>
            </Row>
            <Row>
                <Column medium={6}>
                    <PullQuote>&rdquo;{intro}&ldquo;</PullQuote>
                </Column>
                <Column medium={6}>
                    <h3>The Project</h3>
                    <Content content={project} />
                    <h3>The Outcome</h3>
                    <Content content={outcome} />
                </Column>
            </Row>
            <Row>
                {galleryImages.map((image, index) => {
                    return (
                        <Column medium={4} key={index}>
                            <img src={image} alt={`${title} Gallery Image`} />
                        </Column>
                    );
                })}
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: work } = data;
    return (
        <WorkTemplate
            description={work.frontmatter.description}
            helmet={<Helmet title={`Our Work | ${work.frontmatter.title}`} />}
            title={work.frontmatter.title}
            logo={work.frontmatter.logo}
            hero={work.frontmatter.hero}
            project={work.frontmatter.project}
            outcome={work.frontmatter.outcome}
            galleryImages={work.frontmatter.galleryImages}
            solutions={work.frontmatter.solutions}
            intro={work.frontmatter.intro}
        />
    );
};

export const pageQuery = graphql`
    query WorkByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                intro
                logo
                hero
                project
                outcome
                galleryImages
                solutionsList
            }
        }
    }
`;
