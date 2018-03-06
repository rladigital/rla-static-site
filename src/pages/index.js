import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";
import WebFont from "webfontloader";

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
        this.state = {
            hasMounted: false,
            font: false
        };
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

            // Load web font
            WebFont.load({
                google: {
                    families: ["Montserrat:400,700,900", "sans-serif"]
                },

                active: () => {
                    this.setState({ font: "Montserrat" });
                },

                inactive: () => {
                    this.setState({ font: "Arial" });
                }
            });
        }
        window.netlifyIdentity.init();
    }

    componentDidMount() {
        this.setState({ hasMounted: true });
    }

    render() {
        const { font } = this.state;
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
                        <SolutionsSection solutions={solutions} font={font} />
                        <ClientsSection clients={clients} />
                        {font && (
                            <ServicesSection services={services} font={font} />
                        )}
                        <NewsSection news={news} />
                        {font && <PeopleSection people={people} font={font} />}
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
