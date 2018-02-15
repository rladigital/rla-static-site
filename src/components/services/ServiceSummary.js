import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

const SummaryContainer = styled.section`
    left: 50%;
    top: 200px;
    width: 100%;
    padding: 0 50px;
    max-width: 600px;
    position: absolute;
    text-align: center;
    transform: translateX(-50%);
    font-size: 16px;
    color: white;
`;

const ServiceSummary = ({ service }) => {
    console.log("TEST", service);
    return (
        <SummaryContainer>
            <div dangerouslySetInnerHTML={{ __html: service.html }} />
            <Link to={service.fields.slug}>Read More &rarr;</Link>
        </SummaryContainer>
    );
};

export default ServiceSummary;
