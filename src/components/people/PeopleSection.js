import React from "react";
import styled from "styled-components";

import PeopleSummary from "./PeopleSummary";
import { Row, Column } from "rla-components";

const Container = styled.section`
    position: relative;
    padding: 2rem 0rem;
    background-color: #082748;
    color: ${props => props.theme.lightColor};
`;

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <Container>
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
            </Container>
        );
    }
}

export default PeopleSection;
