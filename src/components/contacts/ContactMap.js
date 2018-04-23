import React from "react";
import { Row, Column } from "rla-components";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L from "leaflet";

import { colors } from "../../theme/theme";
import iconUrl from "../../img/map-marker.svg";
import geoData from "../../data/countries.geo.json";

require("leaflet/dist/leaflet.css");

L.Marker.prototype.options.icon = L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28]
});

export default class ContactMap extends React.Component {
    constructor() {
        super();
        this.state = {
            zoom: 5
        };
    }
    handleMapClick = ev => {
        this.props.selectContactBySlug(ev.sourceTarget.options.slug); // ev is an event object (MouseEvent in this case)
    };

    render() {
        const { selectedContact, zoom, contacts } = this.props;
        const position = {
            lat: selectedContact.frontmatter.lat,
            lng: selectedContact.frontmatter.lng
        };
        return (
            <Map
                ref={m => {
                    this.leaflet = m;
                }}
                center={position}
                zoom={this.state.zoom}
                style={{
                    minHeight: "680px",
                    height: "100%",
                    width: "100%"
                }}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                touchZoom={false}
            >
                {/* <TileLayer
                    attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;http://cartodb.com/attributions&quot;>CartoDB</a>"
                    url="https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png"
                    maxZoom="19"
                /> */}

                <GeoJSON
                    data={geoData}
                    style={{
                        fillColor: "#424f67",
                        weight: 1,
                        color: colors.background,
                        fillOpacity: 1
                    }}
                />

                {contacts.map(({ node: contact }, index) => {
                    return (
                        <Marker
                            position={[
                                contact.frontmatter.lat,
                                contact.frontmatter.lng
                            ]}
                            title={contact.frontmatter.title}
                            alt={contact.frontmatter.title}
                            onClick={this.handleMapClick}
                            slug={contact.fields.slug}
                            key={index}
                        />
                    );
                })}

                {/* {contacts.map(({ node: contact }, index) => {
                    return (
                        <Popup
                            position={[
                                contact.frontmatter.lat,
                                contact.frontmatter.lng
                            ]}
                            key={index}
                        >
                            <div>{contact.frontmatter.title}</div>
                        </Popup>
                    );
                })} */}
            </Map>
        );
    }
}
