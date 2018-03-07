import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import SidebarDate from "../components/SidebarDate";
import HeaderBlock from "../components/HeaderBlock";
import NewsSummary from "../components/news/NewsSummary";

export const NewsTemplate = ({
    content,
    contentComponent,
    hero,
    intro,
    sideHeading,
    galleryImages,
    title,
    date,
    helmet,
    previous,
    next
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <div>
            <PageDetailContainer>
                {helmet || ""}
                <Row>
                    <Column>
                        <img src={hero} alt={`${title} Logo`} />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <HeaderBlock
                            textAlign="left"
                            baseColor={colors.background}
                        >
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
                        <SidebarDate date={date} />
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
            <Row collapse>
                <Column medium={6} collapse>
                    <NewsSummary story={previous} minHeight={30} />
                </Column>
                <Column medium={6} collapse>
                    <NewsSummary story={next} minHeight={30} />
                </Column>
            </Row>
        </div>
    );
};

export default ({ data, pathContext }) => {
    console.log(data);
    const { markdownRemark: news } = data;
    const { previous, next } = pathContext;
    return (
        <NewsTemplate
            description={news.frontmatter.description}
            helmet={<Helmet title={`News | ${news.frontmatter.title}`} />}
            title={news.frontmatter.title}
            date={news.frontmatter.date}
            hero={news.frontmatter.hero}
            intro={news.frontmatter.intro}
            sideHeading={news.frontmatter.sideHeading}
            content={news.html}
            galleryImages={news.frontmatter.galleryImages}
            previous={previous}
            next={next}
        />
    );
};

export const pageQuery = graphql`
    query newsGeneralByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                date
                hero
                intro
                sideHeading
                project
                galleryImages
            }
        }
    }
`;
