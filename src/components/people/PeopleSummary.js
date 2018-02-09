import React from "react";
import styled from "styled-components";

const SummaryContainer = styled.section`
    max-width: 25%;
    float: left;
    text-align: center;
`;

const ProfileImage = styled.img`
    max-width: 50%;
    border-radius: 50%;
`;

const PeopleSummary = ({ person }) => (
    <SummaryContainer>
        <ProfileImage src={person.frontmatter.profile} />
        <h3>{person.frontmatter.title}</h3>
        <h4>{person.frontmatter.role}</h4>
    </SummaryContainer>
);

export default PeopleSummary;
