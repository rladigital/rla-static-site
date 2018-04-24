import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import styled from "styled-components";
import kebabCase from "lodash/kebabCase";
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

const Tag = styled(Link)`
    font-size: 14px;
    font-style: italic;
    font-weight: normal;
    color: ${colors.background};
`;

const Tags = ({ tags }) => {
    return (
        <Container>
            <Title>Tags:</Title>
            {tags.map((tag, index) => {
                return (
                    <span key={index}>
                        <Tag to={`/tags/${kebabCase(tag)}`}>{tag}</Tag>
                        {index != tags.length - 1 && ", "}
                    </span>
                );
            })}
        </Container>
    );
};

export default Tags;
