import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { serveStatic } from "../../helpers/helpers";
import HeaderBlock from "../HeaderBlock";
import SectionContainer from "../SectionContainer";
if (serveStatic()) {
    var PeopleBrowser = require("./PeopleBrowserStatic");
} else {
    var PeopleBrowser = require("./PeopleBrowser");
}
class PeopleSection extends React.Component {
    render() {
        const { people, font } = this.props;

        let full = people.concat(people);
        return (
            <SectionContainer>
                <HeaderBlock>
                    <span>People</span> at our Core
                </HeaderBlock>

                <PeopleBrowser
                    people={full
                        .concat(full)
                        .concat(full)
                        .concat(full)}
                    size={500}
                    font={font}
                />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
