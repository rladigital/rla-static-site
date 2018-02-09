import React from "react";
import PeopleSummary from "./PeopleSummary";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <div>
                {people.map(({ node: person }, index) => {
                    return <PeopleSummary key={index} person={person} />;
                })}
            </div>
        );
    }
}

export default PeopleSection;
