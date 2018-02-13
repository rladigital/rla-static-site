import React from "react";
import styled from "styled-components";

import SolutionSummary from "./SolutionSummary";
import { Row, Column } from "rla-components";

const Container = styled.section`
    position: relative;
    padding: 2rem 0rem;
    background-color: #082748;
    color: ${props => props.theme.lightColor};
`;

//#082748
class SolutionsSection extends React.Component {
    render() {
        const { solutions } = this.props;
        return (
            <Container>
                <Row>
                    <h1>Connected Ambition</h1>
                    <h2>World Class Connected Marketing Solutions</h2>
                </Row>

                <Row>
                    {solutions.map(({ node: solution }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <SolutionSummary solution={solution} />
                            </Column>
                        );
                    })}
                </Row>
            </Container>
        );
    }
}

export default SolutionsSection;
