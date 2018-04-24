import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import { Row, Column } from "rla-components";

import { colors } from "../theme/theme";
import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import HeaderBlock from "../components/HeaderBlock";

export const PeopleTemplate = ({
    content,
    contentComponent,
    title,
    helmet,
    role,
    tags,
    profile,
    linkedIn,
    twitter
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
                    <h3>{role}</h3>
                </Column>
            </Row>
            <Row>
                <Column medium={6}>
                    <img src={profile} alt={`${title} Profile`} />{" "}
                    {twitter && <div>{twitter}</div>}
                    {linkedIn && <div>{linkedIn}</div>}
                </Column>
                <Column medium={6}>
                    <PostContent content={content} />
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: person } = data;
    return (
        <PeopleTemplate
            helmet={
                <Helmet title={`Our People | ${person.frontmatter.title}`} />
            }
            title={person.frontmatter.title}
            content={person.html}
            role={person.frontmatter.role}
            profile={person.frontmatter.profile}
            tags={person.frontmatter.tags}
            linkedIn={person.frontmatter.linkedIn}
            twitter={person.frontmatter.twitter}
        />
    );
};

export const pageQuery = graphql`
    query PeopleByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
                role
                tags
                profile {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
                linkedIn
                twitter
            }
        }
    }
`;
