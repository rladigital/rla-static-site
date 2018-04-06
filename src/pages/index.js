import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

import { serveStatic, isBrowser } from "../helpers/helpers";
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
            width: isBrowser() ? document.body.clientWidth : null,
            height: isBrowser() ? document.body.clientHeight : null
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
        }
        window.netlifyIdentity.init();
    }
    componentDidMount() {
        this.setState({ hasMounted: true });
        if (isBrowser()) {
            window.addEventListener("resize", () => this.handleResize());
        }
    }
    componentWillUnmount() {
        if (isBrowser()) {
            window.removeEventListener("resize", () => this.handleResize());
        }
    }

    handleResize() {
        if (isBrowser()) {
            this.setState({
                width: document.body.clientWidth,
                height: document.body.clientHeight
            });
        }
    }

    render() {
        const { data, scrolltop, font } = this.props;
        const { width, height } = this.state;
        const {
            clients: { edges: clients },
            solutions: { edges: solutions },
            services: { edges: services },
            news: { edges: news },
            people: { edges: people },
            transition
        } = data;
        return (
            <section style={transition && transition.style}>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                {this.state.hasMounted && (
                    <div>
                        <SolutionsSection
                            width={width}
                            height={height}
                            solutions={solutions}
                            font={font}
                            scrolltop={scrolltop}
                        />
                        <ClientsSection clients={clients} />

                        <ServicesSection
                            width={width}
                            height={Math.max(height / 2, 400)}
                            services={services.concat(services)}
                            font={font}
                        />

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
                        color1
                        color2
                        intro
                    }
                }
            }
        }
        news: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "news" } } }
            limit: 2
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    id
                    frontmatter {
                        title
                        templateKey
                        thumb
                        category
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
