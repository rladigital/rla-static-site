import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { colors } from "../../theme/theme";

const Container = styled.div`
    padding: 1.3rem;
    background: #e4e4e3;
    color: ${colors.background};
`;

const Title = styled.h4`
    font-weight: 900;
    margin-bottom: 1em;
`;

const Tag = styled.a`
    font-size: 14px;
    font-style: italic;
    font-weight: normal;
    color: ${colors.background};
`;

const Author = ({ tags }) => {
    return (
        <Container>
            <Title>Tags:</Title>
            {tags.map((tag, index) => {
                return [<Tag>{tag}</Tag>, ", "];
            })}
        </Container>
    );
};

export default Author;
