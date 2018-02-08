import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const PeopleTemplate = ({
    content,
    contentComponent,
    description,
    title,
    helmet
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <section className="section">
            {helmet || ""}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <p>{description}</p>
                        <PostContent content={content} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: person } = data;
    return (
        <PeopleTemplate
            description={person.frontmatter.description}
            helmet={
                <Helmet title={`Our People | ${person.frontmatter.title}`} />
            }
            title={person.frontmatter.title}
            content={person.html}
        />
    );
};

export const pageQuery = graphql`
    query PeopleByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`;
