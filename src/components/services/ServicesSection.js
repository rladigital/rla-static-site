import React from "react";
import styled from "styled-components";

import ServiceSummary from "./ServiceSummary";
import { Row, Column } from "rla-components";

const Container = styled.section`
    position: relative;
    padding: 2rem 0rem;
    background-color: #082748;
    color: ${props => props.theme.lightColor};
`;

class ServicesSection extends React.Component {
    render() {
        const { services } = this.props;
        return (
            <Container>
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
            </Container>
        );
    }
}

export default ServicesSection;
