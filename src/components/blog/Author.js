import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../../theme/theme";

const Container = styled.div`
    padding: 1.3rem;
    background: ${colors.background};
    color: ${colors.white};
`;

const ProfileRow = styled.div`
    width: 100%;
    display: table;
`;

const ProfileColumn = styled.div`
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
`;

const Name = styled.p`
    font-size: 20px;
    font-weight: 900;
    text-transform: uppercase;
`;

const Role = styled.p`
    font-size: 14px;
    text-transform: uppercase;
    color: ${colors.lightGray};
`;

const Author = ({ author }) => {
    return (
        <Container>
            <ProfileRow>
                <ProfileColumn>
                    <ProfileImage src={author.frontmatter.profile} />
                </ProfileColumn>
                <ProfileColumn>
                    <Name>{author.frontmatter.title}</Name>
                    <Role> {author.frontmatter.role}</Role>
                </ProfileColumn>
            </ProfileRow>
        </Container>
    );
};

export default Author;
