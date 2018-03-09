import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";
import PullQuote from "../components/PullQuote";

export const SolutionTemplate = ({
    content,
    contentComponent,
    title,
    intro,
    helmet
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <PageDetailContainer>
            {helmet || ""}
            <Row>
                <Column>
                    <HeaderBlock textAlign="left" baseColor={colors.background}>
                        {title}
                    </HeaderBlock>
                </Column>
            </Row>
            <Row>
                <Column>
                    <h3>{intro}</h3>
                </Column>
            </Row>
            <Row>
                <Column>
                    <PostContent content={content} />
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: solution } = data;
    return (
        <SolutionTemplate
            description={solution.frontmatter.description}
            helmet={
                <Helmet
                    title={`Our Solution | ${solution.frontmatter.title}`}
                />
            }
            title={solution.frontmatter.title}
            content={solution.html}
            intro={solution.frontmatter.intro}
        />
    );
};

export const pageQuery = graphql`
    query SolutionByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                intro
                color1
                color2
                description1
                description2
            }
        }
    }
`;
