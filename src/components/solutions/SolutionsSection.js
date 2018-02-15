import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import SolutionSummary from "./SolutionSummary";
import SectionContainer from "../SectionContainer";

//#082748
class SolutionsSection extends React.Component {
    render() {
        const { solutions } = this.props;
        return (
            <SectionContainer>
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
            </SectionContainer>
        );
    }
}

export default SolutionsSection;
