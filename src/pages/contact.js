import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import theme from "../theme/theme";
import SolutionSummary from "../components/solutions/SolutionSummary";
import HeaderBlock from "../components/HeaderBlock";

require("leaflet/dist/leaflet.css");

export default class SolutionsPage extends React.Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13
    };
    render() {
        const { data: { allMarkdownRemark: { edges: contacts } } } = this.props;
        //console.log(work);
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <Row>
                    <Column>
                        <HeaderBlock
                            fontSize={theme.pageHeaderSection.fontSize}
                            padding={theme.pageHeaderSection.padding}
                        >
                            Get in <span>Touch</span>
                        </HeaderBlock>
                    </Column>
                </Row>

                <Row>
                    <Column>
                        <Map
                            center={position}
                            zoom={this.state.zoom}
                            style={{ height: "300px" }}
                        >
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position}>
                                <Popup>
                                    <span>
                                        A pretty CSS3 popup. <br /> Easily
                                        customizable.
                                    </span>
                                </Popup>
                            </Marker>
                        </Map>
                    </Column>
                </Row>

                <Row>
                    {contacts.map(({ node: contact }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <SolutionSummary solution={contact} />
                            </Column>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

export const pageQuery = graphql`
    query ContactQuery {
        allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "contacts" } } }
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
    }
`;
