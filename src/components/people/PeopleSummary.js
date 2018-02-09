import React from "react";

const PeopleSummary = ({ person }) => (
    <section>
        <h3>{person.frontmatter.title}</h3>
        <h4>{person.frontmatter.role}</h4>
    </section>
);

export default PeopleSummary;
