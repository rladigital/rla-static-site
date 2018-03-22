import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import Carousel from "nuka-carousel";

import theme from "../theme/theme";
import ClientSummary from "../components/clients/ClientSummary";
import HeaderBlock from "../components/HeaderBlock";

export default class ClientsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentSlide: 0 };
    }
    setSlide(x) {
        console.log(x);
        this.setState({ currentSlide: x });
    }
    render() {
        const {
            data: { allMarkdownRemark: { edges: clients } },
            transition
        } = this.props;
        //console.log(clients);

        const settings = {
            slideWidth: 0.3,
            cellAlign: "center",
            dots: false,
            slideIndex: this.state.currentSlide,
            renderCenterRightControls: ({ nextSlide }) => null,
            renderCenterLeftControls: ({ previousSlide }) => null,
            renderBottomCenterControls: ({ currentSlide }) => null
        };

        const temp = clients
            .concat(clients)
            .concat(clients)
            .concat(clients)
            .concat(clients)
            .concat(clients);

        return (
            <div style={transition && transition.style}>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            <span>Brands</span> we work with
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row expanded collapse>
                    <Carousel {...settings}>
                        {temp.map(({ node: client }, index) => {
                            return (
                                // <ClientSummary client={client} />
                                <div
                                    key={index}
                                    src={`http://placehold.it/200x300/ffffff/c0392b/&text=${
                                        client.frontmatter.title
                                    } ${index}`}
                                    onClick={() => this.setSlide(index)}
                                >
                                    <img src={client.frontmatter.logo} />
                                </div>
                            );
                        })}
                    </Carousel>
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query clientsQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "clients" } } }
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
                        logo
                    }
                }
            }
        }
    }
`;
