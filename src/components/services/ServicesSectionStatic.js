import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import ServiceSummary from "./ServiceSummary";
import SectionContainer from "../SectionContainer";

class ServicesSectionStatic extends React.Component {
    render() {
        const { services } = this.props;
        return (
            <SectionContainer>
                <Row>
                    <Column medium={4}>
                        <HeaderBlock textAlign="left">
                            <span>Together</span>
                            <br />
                            We can Achieve More
                        </HeaderBlock>
                    </Column>
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

export default ServicesSectionStatic;
