import React from "react";

import { colors } from "../../theme/theme";
import {
    MapListHeader,
    ContactList,
    ContactListItem
} from "./MapContactListComponents";

class MapContactListGroup extends React.Component {
    render() {
        const { heading, group, contacts, size } = this.props;
        return (
            <div>
                <MapListHeader>{heading}</MapListHeader>
                <ContactList>
                    {contacts
                        .filter(({ node: contact }) => {
                            return contact.frontmatter.group === group;
                        })
                        .map(({ node: contact }, index) => {
                            return (
                                <ContactListItem key={index} size={size}>
                                    {contact.frontmatter.title}
                                </ContactListItem>
                            );
                        })}
                </ContactList>
            </div>
        );
    }
}

export default MapContactListGroup;
