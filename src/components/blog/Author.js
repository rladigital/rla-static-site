import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import Img from "gatsby-image";

import { colors, breakpoints, spacing } from "../../theme/theme";
import { Social } from "./Icon";

const Container = styled.div`
    padding: 1.3rem;
    background: ${colors.background};
    color: ${colors.white};
`;

const ProfileColumn = styled(Column)`
    text-align: center;
    @media (min-width: ${breakpoints.xlarge}px) {
        text-align: left;
    }
`;

const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-size: cover;
    background-position: center;
    margin: 0 auto 1rem auto;
    overflow: hidden;
    @media (min-width: ${breakpoints.xlarge}px) {
        margin: 0;
    }
`;

const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: 900;
    margin-bottom: 1em;
`;

const Name = Title.extend`
    margin: 0;
`;

const Role = styled.p`
    font-size: 14px;
    text-transform: uppercase;
    margin: 0;
    color: ${colors.lightGray};
`;

const Bio = styled.p`
    font-size: 14px;
    margin-bottom: 2em;
`;

const MoreLink = styled.a`
    color: ${colors.white}
    font-size: 14px;
    text-decoration: underline;
    font-weight: normal;
`;

const Email = styled.a`
    color: ${colors.accent}
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 1em;
    display: inline-block;
    font-size: 12px;
`;

const RecentPostList = styled.div`
    display: table;
    padding-bottom: 2rem;
`;
const PostLink = styled(Link)`
    display: table-row;
    font-size: 0.8rem;
    color: ${colors.white};
`;
const PostDate = styled.div`
    display: table-cell;
    padding-right: 1rem;
    padding-bottom: 1em;
`;
const PostTitle = styled.div`
    display: table-cell;
    padding-bottom: 1em;
`;
const Author = ({ author }) => {
    console.log(author);
    return (
        <Container>
            <Row collapse>
                <ProfileColumn xlarge={5}>
                    <ProfileImage>
                        <Img
                            resolutions={
                                author.frontmatter.profile.responsive
                                    .childImageSharp.resolutions
                            }
                        />
                    </ProfileImage>
                </ProfileColumn>
                <ProfileColumn xlarge={7}>
                    <Name>{author.frontmatter.title}</Name>
                    <Role>{author.frontmatter.role}</Role>
                    <Email>{author.frontmatter.email}</Email>
                    <div>
                        {author.frontmatter.linkedIn && (
                            <Social
                                size={30}
                                icon="linkedin-in"
                                href={author.frontmatter.linkedIn}
                            />
                        )}
                    </div>
                </ProfileColumn>
            </Row>
            <Bio>{author.excerpt}</Bio>
            {author.fields.posts &&
                author.fields.posts.length > 0 && (
                    <div>
                        <Title>Recent Posts:</Title>
                        <RecentPostList>
                            {author.fields.posts.map((post, index) => {
                                return (
                                    <PostLink to={post.fields.slug}>
                                        <PostDate>
                                            {post.frontmatter.date}
                                        </PostDate>
                                        <PostTitle>
                                            {post.frontmatter.title}
                                        </PostTitle>
                                    </PostLink>
                                );
                            })}
                        </RecentPostList>
                        <Link to="/">
                            All posts by {author.frontmatter.title}
                        </Link>
                    </div>
                )}

            {/*<MoreLink>More articles by {author.frontmatter.title}</MoreLink>*/}
        </Container>
    );
};

export default Author;
