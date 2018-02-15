import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import PeopleSummary from "./PeopleSummary";
import SectionContainer from "../SectionContainer";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <SectionContainer>
                <h2>People at our Core</h2>
                <Row>
                    {people.map(({ node: person }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <PeopleSummary person={person} />
                            </Column>
                        );
                    })}
                </Row>
            </SectionContainer>
        );
    }
}

export default PeopleSection;
