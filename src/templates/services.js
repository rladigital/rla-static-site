import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";
import PullQuote from "../components/PullQuote";

export const ServiceTemplate = ({
    content,
    contentComponent,
    description,
    title,
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
                    <PostContent content={content} />
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: service } = data;
    return (
        <ServiceTemplate
            description={service.frontmatter.description}
            helmet={
                <Helmet title={`Our Service | ${service.frontmatter.title}`} />
            }
            title={service.frontmatter.title}
            content={service.html}
        />
    );
};

export const pageQuery = graphql`
    query ServiceByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
            }
        }
    }
`;
