import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { colors, breakpoints } from "../../theme/theme";
import Social from "./Social";

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
    background-image: url('${props => props.src}');
    background-size: cover;
    background-position: center;
    margin: 0 auto 1rem auto;
    //margin-right: 1em;
`;

const Title = styled.h3`
    font-weight: 900;
    margin-bottom: 1em;
`;

const Name = Title.extend`
    font-size: 1.2rem;
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
    console.log(author);
    return (
        <Container>
            <Row>
                <ProfileColumn xlarge={5}>
                    <ProfileImage src={author.frontmatter.profile} />
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
            <Link>More articles by {author.frontmatter.title}</Link>
        </Container>
    );
};

export default Author;
