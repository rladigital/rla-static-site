import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const SolutionTemplate = ({
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
    const { markdownRemark: solution } = data;
    return (
        <SolutionTemplate
            description={solution.frontmatter.description}
            helmet={
                <Helmet
                    title={`Our Solution | ${solution.frontmatter.title}`}
                />
            }
            title={solution.frontmatter.title}
            content={solution.html}
        />
    );
};

export const pageQuery = graphql`
    query SolutionByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;
