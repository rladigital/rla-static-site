import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

import { serveStatic } from "../helpers/helpers";
import PeopleSection from "../components/people/PeopleSection";
import ClientsSection from "../components/clients/ClientsSection";
import NewsSection from "../components/news/NewsSection";

if (serveStatic()) {
    var SolutionsSection = require("../components/solutions/SolutionsSectionStatic");
    var ServicesSection = require("../components/services/ServicesSectionStatic");
} else {
    var SolutionsSection = require("../components/solutions/SolutionsSection");
    var ServicesSection = require("../components/services/ServicesSection");
}

export default class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasMounted: false };
    }
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
    componentDidMount() {
        this.setState({ hasMounted: true });
    }

    render() {
        const { data } = this.props;
        const {
            clients: { edges: clients },
            solutions: { edges: solutions },
            services: { edges: services },
            news: { edges: news },
            people: { edges: people }
        } = data;
        return (
            <section>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                {this.state.hasMounted && (
                    <div>
                        <SolutionsSection solutions={solutions} />
                        <ClientsSection clients={clients} />
                        <ServicesSection services={services} />
                        <NewsSection news={news} />
                        <PeopleSection people={people} />
                    </div>
                )}
            </section>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        clients: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "clients" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    excerpt(pruneLength: 400)
                    id
                    frontmatter {
                        title
                        templateKey
                        hero
                    }
                }
            }
        }
        services: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "services" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                    }
                }
            }
        }
        solutions: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "solutions" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        color
                        icon
                        intro
                    }
                }
            }
        }
        news: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { glob: "news-*" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        hero
                    }
                }
            }
        }
        people: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "people" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    excerpt(pruneLength: 400)
                    id
                    frontmatter {
                        title
                        templateKey
                        role
                        profile
                    }
                }
            }
        }
    }
`;
