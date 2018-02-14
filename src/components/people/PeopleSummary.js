import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    text-align: center;
`;

const ProfileImage = styled.img`
    max-width: 70%;
    border-radius: 50%;
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
