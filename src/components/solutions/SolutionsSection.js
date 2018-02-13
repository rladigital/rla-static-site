import React from "react";
import SolutionSummary from "./SolutionSummary";
import { Row, Column } from "rla-components";

class SolutionsSection extends React.Component {
    render() {
        const { solutions } = this.props;
        return (
            <div>
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
                <Row>
                    <p>View all</p>
                </Row>
            </div>
        );
    }
}

export default SolutionsSection;
