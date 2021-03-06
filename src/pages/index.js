import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

import { serveStatic, isBrowser } from "../helpers/helpers";
import PeopleSection from "../components/people/PeopleSection";
import WorkSection from "../components/work/WorkSection";
import NewsSection from "../components/news/NewsSection";
import MissionSection from "../components/mission/MissionSection";
import MwWinner from "../components/MwWinner";

if (!isBrowser()) {
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
            width: isBrowser() ? window.innerWidth : null,
            height: isBrowser() ? window.innerHeight : null
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
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }

    render() {
        const { data, scrolltop, setOffcanvasColor } = this.props;
        const { width, height } = this.state;
        const {
            work: { edges: work },
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
                <MwWinner top={"35%"} />
                <SolutionsSection
                    width={width}
                    height={height}
                    solutions={solutions}
                    scrolltop={scrolltop}
                    setOffcanvasColor={setOffcanvasColor}>
                    <WorkSection work={work} />
                    <ServicesSection
                        width={width}
                        height={Math.max(height / 2, 400)}
                        services={services}
                    />
                    <NewsSection width={width} news={news} />
                    <PeopleSection people={people} />
                    <MissionSection />
                </SolutionsSection>
            </section>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        work: allMarkdownRemark(
            sort: { fields: [frontmatter___weighting] }
            filter: { frontmatter: { templateKey: { eq: "work" } } }
            limit: 6
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
                        hero {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
                        thumb {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
                        excerpt
                        previewType
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
                    htmlAst
                    id
                    frontmatter {
                        title
                        templateKey
                        color1
                        color2
                        intro
                        description1
                        description2
                    }
                }
            }
        }
        news: allMarkdownRemark(
            sort: {
                fields: [frontmatter___date, frontmatter___weighting]
                order: ASC
            }
            filter: { frontmatter: { templateKey: { eq: "news" } } }
            limit: 4
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
                        thumb {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
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
                    html
                    id
                    frontmatter {
                        title
                        templateKey
                        role
                        tags
                        profile {
                            responsive {
                                childImageSharp {
                                    original {
                                        src
                                    }
                                }
                            }
                            original
                        }
                    }
                }
            }
        }
    }
`;
