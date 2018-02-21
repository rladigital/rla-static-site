import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import theme from "../theme/theme";
import SolutionSummary from "../components/solutions/SolutionSummary";
import HeaderBlock from "../components/HeaderBlock";
import MapWrapper from "../components/contacts/MapWrapper";
import { MapListContainer } from "../components/contacts/MapContactListComponents";
import MapContactListGroup from "../components/contacts/MapContactListGroup";

require("leaflet/dist/leaflet.css");
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Marker.prototype.options.icon = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
export default class ContactPage extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 4,
            selectedContact: {}
        };
    }
    componentWillMount() {
        this.selectContactBySlug("/contacts/bournemouth/");
    }
    componentDidMount() {
        this.setupMap();
    }
    setupMap = () => {
        const leaflet = this.leaflet.leafletElement;
        leaflet.on("zoomend", () => {
            window.console.log("Current zoom level -> ", leaflet.getZoom());
        });
    };
    selectContactBySlug = slug => {
        const { data: { allMarkdownRemark: { edges: contacts } } } = this.props;
        try {
            const contact = contacts.filter(({ node: contact }) => {
                return contact.fields.slug === slug;
            })[0];
            this.setState({ selectedContact: contact.node });
        } catch (e) {}
    };
    render() {
        const { data: { allMarkdownRemark: { edges: contacts } } } = this.props;
        // console.log(contacts);
        const position = {
            lat: this.state.selectedContact.frontmatter.lat,
            lng: this.state.selectedContact.frontmatter.lng
        };
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
                        <MapWrapper>
                            <Map
                                ref={m => {
                                    this.leaflet = m;
                                }}
                                center={position}
                                zoom={this.state.zoom}
                                style={{
                                    height: "300px",
                                    width: "100%",
                                    position: "absolute",
                                    zIndex: "1"
                                }}
                            >
                                <TileLayer
                                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {contacts.map(({ node: contact }, index) => {
                                    return (
                                        <Marker
                                            position={[
                                                contact.frontmatter.lat,
                                                contact.frontmatter.lng
                                            ]}
                                        >
                                            Hello
                                        </Marker>
                                    );
                                })}
                            </Map>
                            <MapListContainer>
                                <MapContactListGroup
                                    heading="RLA Locations"
                                    group="RLA"
                                    contacts={contacts}
                                />
                                <MapContactListGroup
                                    heading="Mission Locations"
                                    group="mission"
                                    contacts={contacts}
                                />
                                <MapContactListGroup
                                    heading="Also In"
                                    group="other"
                                    contacts={contacts}
                                    size="small"
                                />
                            </MapListContainer>
                        </MapWrapper>
                    </Column>
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
                        group
                        color
                        icon
                        intro
                        lat
                        lng
                    }
                }
            }
        }
    }
`;
