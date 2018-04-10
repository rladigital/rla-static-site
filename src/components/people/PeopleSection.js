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
        const { people } = this.props;

        return (
            <SectionContainer>
                <HeaderBlock>
                    <span>People</span> at our Core
                </HeaderBlock>

                <PeopleBrowser people={people.concat(people)} size={500} />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
