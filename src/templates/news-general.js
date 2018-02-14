import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";
import Content, { HTMLContent } from "../components/Content";

export const NewsTemplate = ({
    content,
    contentComponent,
    hero,
    intro,
    sideHeading,
    galleryImages,
    title,
    helmet
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <Row>
            {helmet || ""}
            <Column>
                <h1>{title}</h1>
            </Column>
            <Column>
                <img
                    style={{ borderRadius: "5px" }}
                    src={hero}
                    alt={`${title} Logo`}
                />
            </Column>
            <Column medium={8}>
                <h2>{intro}</h2>
                <PostContent content={content} />
            </Column>
            <Column medium={4}>
                <h3>{sideHeading}</h3>

                {galleryImages.map((image, index) => {
                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`${title} Gallery Image`}
                        />
                    );
                })}
            </Column>
        </Row>
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
            intro={news.frontmatter.intro}
            sideHeading={news.frontmatter.sideHeading}
            content={news.html}
            galleryImages={news.frontmatter.galleryImages}
        />
    );
};

export const pageQuery = graphql`
    query newsGeneralByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                hero
                intro
                sideHeading
                project
                galleryImages
            }
        }
    }
`;
