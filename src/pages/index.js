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
        const { edges: people } = data.allMarkdownRemark;

        console.log(people);

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

                    {people
                        .filter(
                            person =>
                                person.node.frontmatter.templateKey === "people"
                        )
                        .map(({ node: person }, index) => (
                            <p key={index}>{person.excerpt}</p>
                        ))}
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
