import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const PeopleTemplate = ({
    content,
    contentComponent,
    title,
    helmet,
    role
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <section>
            {helmet || ""}
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
            </h1>
            <PostContent content={content} />
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: person } = data;
    return (
        <PeopleTemplate
            helmet={
                <Helmet title={`Our People | ${person.frontmatter.title}`} />
            }
            title={person.frontmatter.title}
            content={person.html}
            role={person.frontmatter.role}
        />
    );
};

export const pageQuery = graphql`
    query PeopleByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                path
                title
                role
            }
        }
    }
`;
