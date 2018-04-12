import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../../theme/theme";
import Social from "./Social";

const Container = styled.div`
    padding: 1.3rem;
    background: ${colors.background};
    color: ${colors.white};
`;

const ProfileRow = styled.div`
    width: 100%;
    display: table;
    margin-bottom: 1.8em;
`;

const ProfileColumn = styled.div`
    width: ${props => props.width}px;
    display: table-cell;
    vertical-align: top;
`;

const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-image: url('${props => props.src}');
    background-size: cover;
    background-position: center;
    margin-right: 1em;
`;

const Title = styled.h4`
    font-weight: 900;
    margin-bottom: 1em;
`;

const Name = Title.extend`
    margin: 0;
`;

const Role = styled.p`
    font-size: 14px;
    text-transform: uppercase;
    margin-bottom: 0;
    color: ${colors.lightGray};
`;

const Bio = styled.p`
    font-size: 14px;
    margin-bottom: 2em;
`;

const Link = styled.a`
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

const Author = ({ author }) => {
    return (
        <Container>
            <ProfileRow>
                <ProfileColumn width={110}>
                    <ProfileImage src={author.frontmatter.profile} />
                </ProfileColumn>
                <ProfileColumn>
                    <Name>{author.frontmatter.title}</Name>
                    <Role>{author.frontmatter.role}</Role>
                    <Email>{author.frontmatter.twitter}</Email>
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
            </ProfileRow>
            <Bio>{author.excerpt}</Bio>
            <Link>More articles by {author.frontmatter.title}</Link>
        </Container>
    );
};

export default Author;
