import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import PeopleBrowser from "./PeopleBrowser";
import SectionContainer from "../SectionContainer";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;

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
                />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
