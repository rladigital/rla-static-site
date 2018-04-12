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
            <SectionContainer padding="6em 0 4em">
                <HeaderBlock
                    fontSize={3.4}
                    padding={{
                        top: 0,
                        right: 0,
                        bottom: 4,
                        left: 0
                    }}
                >
                    <span>People</span> at our Core
                </HeaderBlock>

                <PeopleBrowser people={people.concat(people)} size={500} />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
