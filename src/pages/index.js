import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

import PeopleSection from "../components/people/PeopleSection";
import ClientsSection from "../components/clients/ClientsSection";

export default class IndexPage extends React.Component {
    handleScriptLoad() {
        if (typeof window !== `undefined` && window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
                if (!user) {
                    window.netlifyIdentity.on("login", () => {
                        document.location.href = "/admin/";
                    });
                }
            });
        }
        window.netlifyIdentity.init();
    }

    render() {
        const { data } = this.props;

        const { people: { edges: people }, clients: { edges: clients } } = data;
        return (
            <section>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                <ClientsSection clients={clients} />
                <PeopleSection people={people} />
            </section>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        people: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "people" } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 400)
                    id
                    frontmatter {
                        title
                        templateKey
                        path
                        role
                        profile
                    }
                }
            }
        }
        clients: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "clients" } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 400)
                    id
                    frontmatter {
                        title
                        templateKey
                        path
                        hero
                    }
                }
            }
        }
    }
`;
