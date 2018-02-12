import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

export const NewsTemplate = ({
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
        <section>
            {helmet || ""}
            <h1>{title}</h1>
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
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: news } = data;
    return (
        <NewsTemplate
            description={news.frontmatter.description}
            helmet={<Helmet title={`News | ${news.frontmatter.title}`} />}
            title={news.frontmatter.title}
            hero={news.frontmatter.hero}
            project={news.frontmatter.project}
            outcome={news.frontmatter.outcome}
            galleryImages={news.frontmatter.galleryImages}
        />
    );
};

export const pageQuery = graphql`
    query newsByPath($path: String!) {
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
