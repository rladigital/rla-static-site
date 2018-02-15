import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import SolutionSummary from "./SolutionSummary";
import SectionContainer from "../SectionContainer";

//#082748
class SolutionsSection extends React.Component {
    render() {
        const { solutions } = this.props;
        return (
            <SectionContainer>
                <Row>
                    <HeaderBlock>
                        Connected Ambition<br />
                        <span>World Class Connected Marketing Solutions</span>
                    </HeaderBlock>
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
