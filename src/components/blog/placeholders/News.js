import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../../HeaderBlock";
import { colors, spacing } from "../../../theme/theme";

const Container = styled.div`
    border: 1px solid #ddd;
`;

const Title = styled.h1`
    font-size: 1.2em;
    margin-bottom: 0;
`;

const Section = styled.div`
    padding: ${spacing.padding}rem;
    border-bottom: 1px solid #ddd;
    display: table;
    width: 100%;
    transition: all 500ms ease-out;
    &:hover {
        background-color: rgba(7, 23, 44, 0.1);
    }
`;

const TitleSection = styled.div`
    width: 100%;
    padding: ${spacing.padding}rem ${spacing.padding}rem
        ${spacing.padding / 2}rem ${spacing.padding}rem;
    border-bottom: none;
`;

const SectionDivider = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const NumberPrefix = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: ${colors.lightGray};
    margin-right: ${spacing.padding}rem;
`;

const StyledLink = styled(Link)`
    font-weight: normal;
    color: ${colors.black};
    font-size: 1rem;
    line-height: 1.5;
`;

const NewsPlaceholder = ({ height, news }) => (
    <Container
        color={colors.background}
        background={colors.white}
        padding={`${spacing.padding}rem `}
        fontSize={1}
        style={{ height: `${height}rem`, marginBottom: `${spacing.margin}em` }}
    >
        {console.log(news)}
        <TitleSection>
            <Title>Featured Stories</Title>
        </TitleSection>
        {news.map(({ node: item }, index) => {
            return (
                <StyledLink to={item.fields.slug}>
                    <Section>
                        <SectionDivider>
                            {item.frontmatter.title}
                        </SectionDivider>
                    </Section>
                </StyledLink>
            );
        })}
    </Container>
);

export default NewsPlaceholder;
