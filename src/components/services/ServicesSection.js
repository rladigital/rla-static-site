import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import ServiceSummary from "./ServiceSummary";
import SectionContainer from "../SectionContainer";

class ServicesSection extends React.Component {
    render() {
        const { services } = this.props;
        return (
            <SectionContainer>
                <Row>
                    <h1>Together</h1>
                    <h2>We can Achieve More</h2>
                </Row>

                <Row>
                    {services.map(({ node: service }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <ServiceSummary service={service} />
                            </Column>
                        );
                    })}
                </Row>
            </SectionContainer>
        );
    }
}

export default ServicesSection;
