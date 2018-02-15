import React from "react";
import { Row, Column } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import WorkSummary from "./WorkSummary";
import { colors } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

class WorkSection extends React.Component {
    render() {
        const { work } = this.props;
        return (
            <SectionContainer
                color={colors.background}
                background={colors.white}
            >
                <Row>
                    <HeaderBlock baseColor={colors.background}>
                        30 Years of Delivering<br />
                        <span>Strategic, Profitable Communications</span>
                    </HeaderBlock>
                </Row>

                <Row>
                    {work.map(({ node: caseStudy }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <WorkSummary work={caseStudy} />
                            </Column>
                        );
                    })}
                </Row>
                <Row>
                    <p>View all</p>
                </Row>
            </SectionContainer>
        );
    }
}

export default WorkSection;
