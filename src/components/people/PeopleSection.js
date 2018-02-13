import React from "react";
import PeopleSummary from "./PeopleSummary";
import { Row, Column } from "rla-components";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

export default PeopleSection;
