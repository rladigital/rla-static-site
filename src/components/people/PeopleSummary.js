import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import ProfileImage from "../ProfileImage";

const SummaryContainer = styled.section`
    text-align: center;
`;

const PeopleSummary = ({ person }) => {
    //console.log(person);
    return (
        <SummaryContainer>
            <Link to={person.fields.slug}>
                <ProfileImage src={person.frontmatter.profile} />
                <h3>{person.frontmatter.title}</h3>
                <h4>{person.frontmatter.role}</h4>
            </Link>
        </SummaryContainer>
    );
};

export default PeopleSummary;
