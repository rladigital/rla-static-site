import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import { colors, spacing } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import HeaderBlock from "../components/HeaderBlock";
import SidebarDate from "../components/blog/SidebarDate";
import NewsSummary from "../components/news/NewsSummary";
import Author from "../components/blog/Author";

import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";

const contentStyle = {
    marginBottom: "4em",
    color: colors.lightGray
};

export const NewsTemplate = ({
    content,
    contentComponent,
    hero,
    intro,
    sideHeading,
    galleryImages,
    author,
    title,
    date,
    helmet,
    previous,
    next,
    transition
}) => {
    const PostContent = contentComponent || HTMLContent;
    console.log(author);
    return (
        <div style={transition && transition.style}>
            <PageDetailContainer>
                {helmet || ""}
                <BackButton to="/news" />
                {hero && (
                    <Row>
                        <Column>
                            <Hero src={hero} />{" "}
                        </Column>
                    </Row>
                )}
                <Row>
                    <Column medium={8}>
                        <HeaderBlock
                            textAlign="left"
                            baseColor={colors.background}
                            fontSize={3}
                            padding={{
                                top: 0.6,
                                right: 0,
                                bottom: 2.4,
                                left: 0
                            }}
                        >
                            {title}
                        </HeaderBlock>
                    </Column>
                </Row>
                <Row>
                    <Column medium={7} className="postContent">
                        <PostContent style={contentStyle} content={content} />
                    </Column>
                    <Column medium={1}>&nbsp;</Column>
                    <Column medium={4}>
                        <SidebarDate date={date} />
                        <PullQuote fontSize={1.8} padding="0 0 2rem">
                            {sideHeading}
                        </PullQuote>

                        {author && <Author author={author} />}

                        {/* {galleryImages.map((image, index) => {
                            if (image) {
                                return (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${title} Gallery Image`}
                                    />
                                );
                            }
                        })} */}
                    </Column>
                </Row>
            </PageDetailContainer>
            <Row collapse expanded>
                <Column medium={6} collapse>
                    {previous ? (
                        <NewsSummary story={previous} minHeight={30} />
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </Column>
                <Column medium={6} collapse>
                    {next ? (
                        <NewsSummary story={next} minHeight={30} />
                    ) : (
                        <span>&nbsp;</span>
                    )}
                </Column>
            </Row>
        </div>
    );
};

export default ({ data, pathContext, transition }) => {
    //console.log(data, transition);
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
            transition={transition}
            author={news.frontmatter.author}
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
                author {
                    excerpt(pruneLength: 400)
                    frontmatter {
                        title
                        role
                        profile
                    }
                }
            }
        }
    }
`;
