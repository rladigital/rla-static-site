import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const ServiceTemplate = ({
    content,
    contentComponent,
    description,
    title,
    helmet
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <section>
            {helmet || ""}
            <h1>{title}</h1>
            <p>{description}</p>
            <PostContent content={content} />
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: service } = data;
    return (
        <ServiceTemplate
            description={service.frontmatter.description}
            helmet={
                <Helmet title={`Our Service | ${service.frontmatter.title}`} />
            }
            title={service.frontmatter.title}
            content={service.html}
        />
    );
};

export const pageQuery = graphql`
    query ServiceByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;
