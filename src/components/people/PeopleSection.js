import React from "react";
import PeopleSummary from "./PeopleSummary";

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;
        return (
            <div>
                <h2>People at our Core</h2>
                {people.map(({ node: person }, index) => {
                    return <PeopleSummary key={index} person={person} />;
                })}
            </div>
        );
    }
}

export default PeopleSection;
