import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const ClientTemplate = ({
    content,
    contentComponent,
    logo,
    project,
    outcome,
    galleryImages,
    solutions,
    title,
    helmet
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                    {title}
                </h1>
                <img
                    style={{ borderRadius: "5px" }}
                    src={logo}
                    alt={`${title} Logo`}
                />
                <PostContent content={project} />
                <PostContent content={outcome} />
                {galleryImages.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`${title} Gallery Image`}
                        />
                    );
                })}
            </div>
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
        />
    );
};

export const pageQuery = graphql`
    query ClientByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
                logo
                project
                outcome
                galleryImages
                solutions
            }
        }
    }
`;
