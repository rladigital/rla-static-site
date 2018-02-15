import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";
import Content, { HTMLContent } from "../components/Content";

export const ClientTemplate = ({
    content,
    logo,
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
        <section>
            {helmet || ""}
            <Row>
                <Column>
                    <h1>{title}</h1>
                    <img
                        style={{ borderRadius: "5px" }}
                        src={logo}
                        alt={`${title} Logo`}
                    />
                </Column>
            </Row>
            <Row>
                <Column medium={6}>
                    <h4>{intro}</h4>
                </Column>
                <Column medium={6}>
                    <div />
                    <Content content={project} />
                    <Content content={outcome} />
                </Column>
                {galleryImages.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`${title} Gallery Image`}
                        />
                    );
                })}
            </Row>
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: client } = data;
    return (
        <ClientTemplate
            description={client.frontmatter.description}
            helmet={
                <Helmet title={`Our Client | ${client.frontmatter.title}`} />
            }
            title={client.frontmatter.title}
            logo={client.frontmatter.logo}
            project={client.frontmatter.project}
            outcome={client.frontmatter.outcome}
            galleryImages={client.frontmatter.galleryImages}
            solutions={client.frontmatter.solutions}
            intro={client.frontmatter.intro}
        />
    );
};

export const pageQuery = graphql`
    query ClientByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                intro
                logo
                project
                outcome
                galleryImages
                solutions
            }
        }
    }
`;
