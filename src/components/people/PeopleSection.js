import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import PeopleBrowser from "./PeopleBrowser";
import SectionContainer from "../SectionContainer";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <SectionContainer>
                <HeaderBlock>
                    <span>People</span> at our Core
                </HeaderBlock>
                <Row>
                    <PeopleBrowser people={people} />
                </Row>
            </SectionContainer>
        );
    }
}

export default PeopleSection;
