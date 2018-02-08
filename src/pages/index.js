import React from "react";
import Link from "gatsby-link";
import Script from "react-load-script";
import graphql from "graphql";

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
        const { edges: posts } = data.allMarkdownRemark;

        console.log(posts);

        return (
            <section>
                <Script
                    url="https://identity.netlify.com/v1/netlify-identity-widget.js"
                    onLoad={() => this.handleScriptLoad()}
                />
                <div>
                    <div>
                        <h1>30 Years of Delivering</h1>
                        <h2>Strategic, Profitable Communications</h2>
                    </div>
                    <div>
                        <h2>Clients</h2>
                        {posts
                            .filter(
                                post =>
                                    post.node.frontmatter.templateKey ===
                                    "clients"
                            )
                            .map(({ node: client }, index) => (
                                <p key={index}>{client.frontmatter.title}</p>
                            ))}
                    </div>
                    <div>
                        <h2>People</h2>
                        {posts
                            .filter(
                                post =>
                                    post.node.frontmatter.templateKey ===
                                    "people"
                            )
                            .map(({ node: person }, index) => (
                                <p key={index}>{person.excerpt}</p>
                            ))}
                    </div>
                </div>
            </section>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        allMarkdownRemark {
            edges {
                node {
                    html
                    excerpt(pruneLength: 400)
                    id
                    frontmatter {
                        title
                        templateKey
                        path
                    }
                }
            }
        }
    }
`;
