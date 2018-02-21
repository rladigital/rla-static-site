import React from "react";

import { colors } from "../../theme/theme";
import {
    MapListHeader,
    ContactList,
    ContactListItem
} from "./MapContactListComponents";

class MapContactListGroup extends React.Component {
    render() {
        const {
            heading,
            group,
            contacts,
            selectedContact,
            size,
            onItemClick
        } = this.props;
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
                                <ContactListItem
                                    key={index}
                                    size={size}
                                    onClick={onItemClick.bind(
                                        this,
                                        contact.fields.slug
                                    )}
                                    active={
                                        contact.fields.slug ===
                                        selectedContact.fields.slug
                                    }
                                >
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
