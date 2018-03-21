import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import HeaderBlock from "../components/HeaderBlock";

export const ClientTemplate = ({ logo, color, solutions, title, helmet }) => {
    //console.log(project, outcome);
    return (
        <PageDetailContainer>
            {helmet || ""}
            <Row>
                <Column>
                    <img
                        src={logo}
                        alt={`${title} Logo`}
                        title={`${title} Logo`}
                    />
                </Column>
            </Row>
            <Row>
                {solutions.map((solution, index) => {
                    return (
                        <Column medium={4} key={index}>
                            {title}
                        </Column>
                    );
                })}
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: client } = data;
    return (
        <ClientTemplate
            helmet={
                <Helmet title={`Our Client | ${client.frontmatter.title}`} />
            }
            title={client.frontmatter.title}
            logo={client.frontmatter.logo}
            color={client.frontmatter.color}
            solutions={client.frontmatter.solutionsList}
        />
    );
};

export const pageQuery = graphql`
    query ClientByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                logo
                color
                solutionsList
            }
        }
    }
`;
