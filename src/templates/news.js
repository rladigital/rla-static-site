import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import { Row, Column } from "rla-components";
import styled from "styled-components";

import { getOriginalImageSrc } from "../utils/image";
import { colors, spacing, breakpoints } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import HeaderBlock from "../components/HeaderBlock";
import SidebarDate from "../components/blog/SidebarDate";
import { Social } from "../components/blog/Icon";
import NewsSummary from "../components/news/NewsSummary";
import Author from "../components/blog/Author";

import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";
import Tags from "../components/blog/Tags";
import { isBrowser } from "../helpers/helpers";

const Sidebar = styled(Column)`
    @media (min-width: ${breakpoints.xlarge}px) {
        max-width: 400px;
        float: right;
    }
`;

const SocialContainer = styled.div`
    margin: 0 1rem 3rem 0;
    color: #07172C;
    font-weight: 500;
    p{
        margin-bottom 0.5em;
    }
`;

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
    transition,
    history,
    tags
}) => {
    const PostContent = contentComponent || HTMLContent;
    return (
        <div style={transition && transition.style}>
            <PageDetailContainer>
                {helmet || ""}
                <BackButton goBack={history.goBack} />
                {hero && (
                    <Row>
                        <Column>
                            <Hero src={getOriginalImageSrc(hero)} />{" "}
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
                            }}>
                            {title}
                        </HeaderBlock>
                    </Column>
                </Row>
                <Row>
                    <Column medium={7} className="postContent">
                        <PostContent
                            content={content}
                            className="cms-content"
                        />
                    </Column>
                    <Column medium={1}>&nbsp;</Column>
                    <Sidebar medium={4}>
                        <SidebarDate date={date.toLowerCase()} />
                        <PullQuote fontSize={1.8} padding="0 0 2.6rem">
                            {sideHeading}
                        </PullQuote>

                        <SocialContainer>
                            <p>Share This Post</p>
                            {isBrowser() && (
                                <Social
                                    size={50}
                                    icon="linkedin-in"
                                    href={
                                        "https://www.linkedin.com/shareArticle?mini=true&url=" +
                                        window.location.href +
                                        "&title=" +
                                        title +
                                        "&summary=" +
                                        sideHeading
                                    }
                                    color={colors.background}
                                    borderColor={colors.background}
                                    transform="shrink-10 up-0.5"
                                    margin="0 1rem 0 0"
                                />
                            )}
                            {isBrowser() && (
                                <Social
                                    size={50}
                                    icon="twitter"
                                    href={
                                        "https://twitter.com/home?status=" +
                                        title +
                                        " - " +
                                        sideHeading +
                                        " - " +
                                        window.location.href
                                    }
                                    color={colors.background}
                                    borderColor={colors.background}
                                    transform="shrink-10 "
                                    margin="0 1rem 0 0 "
                                />
                            )}
                        </SocialContainer>

                        {author && <Author author={author} />}

                        {tags && <Tags tags={tags} />}

                        {/* {galleryImages.map((image, index) => {
                            if (image) {
                                return (
                                    <img
                                        key={index}
                                        src={getOriginalImageSrc(image)}
                                        alt={`${title} Gallery Image`}
                                    />
                                );
                            }
                        })} */}
                    </Sidebar>
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

export default ({ history, data, pathContext, transition }) => {
    //console.log(data, transition);
    const { markdownRemark: news } = data;
    const { previous, next, slug } = pathContext;
    const { title, metaTitle, metaDescription, hero } = news.frontmatter;
    const pageTitle =
        metaTitle ||
        `${title} | News | RLA Group | Full Service Advertising Agency`;
    return (
        <NewsTemplate
            description={news.frontmatter.description}
            helmet={
                <Helmet title={pageTitle}>
                    <meta name="title" content={pageTitle} />
                    {title && <meta property="og:title" content={title} />}
                    {hero && (
                        <meta
                            property="og:image"
                            content={`//www.rla.co.uk${hero.original}`}
                        />
                    )}
                    {metaDescription && (
                        <meta
                            property="og:description"
                            content={metaDescription}
                        />
                    )}
                    <meta
                        property="og:url"
                        content={`//www.rla.co.uk${slug}`}
                    />
                    {metaDescription && (
                        <meta name="description" content={metaDescription} />
                    )}
                </Helmet>
            }
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
            history={history}
            author={news.frontmatter.author}
            tags={news.frontmatter.tags}
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
                hero {
                    responsive {
                        childImageSharp {
                            original {
                                src
                            }
                        }
                    }
                    original
                }
                intro
                metaTitle
                metaDescription
                sideHeading
                galleryImages
                tags
                author {
                    excerpt(pruneLength: 400)
                    fields {
                        posts {
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                date
                            }
                        }
                    }
                    frontmatter {
                        title
                        role
                        email
                        profile {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                    resolutions(width: 100, height: 100) {
                                        ...GatsbyImageSharpResolutions
                                    }
                                }
                            }
                            original
                        }
                        twitter
                        linkedIn
                    }
                }
            }
        }
    }
`;
