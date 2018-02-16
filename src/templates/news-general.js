import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import HeaderBlock from "../components/HeaderBlock";

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
        <PageDetailContainer>
            {helmet || ""}
            <Row>
                <Column>
                    <img src={hero} alt={`${title} Logo`} />
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
                <Column medium={8}>
                    <h2>{intro}</h2>
                    <PostContent content={content} />
                </Column>
                <Column medium={4}>
                    <PullQuote>{sideHeading}</PullQuote>

                    {galleryImages.map((image, index) => {
                        if (image) {
                            return (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${title} Gallery Image`}
                                />
                            );
                        }
                    })}
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
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
