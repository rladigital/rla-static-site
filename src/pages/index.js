import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

import PeopleSection from "../components/people/PeopleSection";
import ClientsSection from "../components/clients/ClientsSection";
import SolutionsSection from "../components/solutions/SolutionsSection";
import ServicesSection from "../components/services/ServicesSection";

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

        const {
            people: { edges: people },
            clients: { edges: clients },
            solutions: { edges: solutions },
            services: { edges: services }
        } = data;
        return (
            <section>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                <SolutionsSection solutions={solutions} />
                <ClientsSection clients={clients} />
                <ServicesSection services={services} />
                <PeopleSection people={people} />
            </section>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        services: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "services" } } }
        ) {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        path
                    }
                }
            }
        }
        solutions: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "solutions" } } }
        ) {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        path
                        color
                        icon
                        intro
                    }
                }
            }
        }
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
