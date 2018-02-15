import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import PeopleSummary from "./PeopleSummary";

class PeopleBrowser extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <div>
                {people.map(({ node: person }, index) => {
                    return (
                        <Column medium={3} key={index}>
                            <PeopleSummary person={person} />
                        </Column>
                    );
                })}
            </div>
        );
    }
}

export default PeopleBrowser;
