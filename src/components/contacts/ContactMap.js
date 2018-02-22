import React from "react";
import { Row, Column } from "rla-components";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

require("leaflet/dist/leaflet.css");

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
                    minHeight: "500px",
                    height: "100%",
                    width: "100%"
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
                            title={contact.frontmatter.title}
                            alt={contact.frontmatter.title}
                            onClick={this.handleMapClick}
                            slug={contact.fields.slug}
                            key={index}
                        />
                    );
                })}
            </Map>
        );
    }
}
