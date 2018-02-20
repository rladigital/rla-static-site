import React from "react";
import graphql from "graphql";
import Helmet from "react-helmet";
import Content, { HTMLContent } from "../components/Content";

import ProfileImage from "../components/ProfileImage";

export const ContactTemplate = ({
    content,
    contentComponent,
    title,
    helmet,
    role,
    contactImage
}) => {
    const PostContent = contentComponent || HTMLContent;

    return (
        <section>
            {helmet || ""}
            <h1>{title}</h1>
            <ProfileImage src={contactImage} />
        </section>
    );
};

export default ({ data }) => {
    console.log(data);
    const { markdownRemark: contact } = data;
    return (
        <ContactTemplate
            helmet={<Helmet title={`Contact | ${contact.frontmatter.title}`} />}
            title={contact.frontmatter.title}
            content={contact.html}
            role={contact.frontmatter.role}
            contactImage={contact.frontmatter.contactImage}
        />
    );
};

export const pageQuery = graphql`
    query ContactByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            frontmatter {
                title
                role
                address
                tel
                email
                contactImage
            }
        }
    }
`;
