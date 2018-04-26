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
`;

const TitleSection = Section.extend`
    padding-bottom: 0;
    border-bottom: none;
`;

const SectionDivider = styled.div`
    display: table-cell;
    vertical-align: middle;
`;

const Number = styled.div`
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
                            <Number>{index + 1}</Number>
                        </SectionDivider>
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