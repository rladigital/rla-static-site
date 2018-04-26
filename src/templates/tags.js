import React from "react";
import PropTypes from "prop-types";
import { Row, Column } from "rla-components";

// Components
import Link from "gatsby-link";

import theme, { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import generateLayout from "../theme/generatePostLayout";
import { randomChunkArray, random } from "../helpers/helpers";

const rowsAdvance = 3;

class TagsPage extends React.Component {
    //const Tags = ({ pathContext, data, transition }) => {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { data: { allMarkdownRemark: { edges: news } } } = this.props;

        const chunks = randomChunkArray(news, 2, 4);

        const layout = generateLayout(chunks);

        this.setState({
            rows: rowsAdvance,
            chunkedNews: chunks,
            layout: layout
        });

        //console.log(chunks);
    }

    handleClick() {
        this.setState({
            rows: this.state.rows + rowsAdvance
        });
    }

    render() {
        const { tag } = this.props.pathContext;
        let {
            data: { allMarkdownRemark: { edges: news, totalCount } },
            transition
        } = this.props;
        const { chunkedNews, rows, layout } = this.state;

        //const { edges, totalCount } = this.props.data.allMarkdownRemark;
        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            {totalCount} post{totalCount === 1 ? "" : "s"}{" "}
                            tagged with <span>{tag}</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row expanded collapse>
                    {chunkedNews &&
                        chunkedNews.slice(0, rows).map((items, i) => {
                            return layout[i](items);
                        })}
                </Row>
            </div>
        );
    }
}

TagsPage.propTypes = {
    pathContext: PropTypes.shape({
        tag: PropTypes.string.isRequired
    }),
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            totalCount: PropTypes.number.isRequired,
            edges: PropTypes.arrayOf(
                PropTypes.shape({
                    node: PropTypes.shape({
                        fields: PropTypes.shape({
                            slug: PropTypes.string.isRequired
                        }),
                        frontmatter: PropTypes.shape({
                            title: PropTypes.string.isRequired
                        })
                    })
                }).isRequired
            )
        })
    })
};

export default TagsPage;

export const pageQuery = graphql`
    query TagPage($tag: String) {
        allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    fields {
                        slug
                    }
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
    }
`;
