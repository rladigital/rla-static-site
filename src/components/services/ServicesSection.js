import React from "react";
import ServiceSummary from "./ServiceSummary";
import { Row, Column } from "rla-components";

class ServicesSection extends React.Component {
    render() {
        const { services } = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

export default ServicesSection;
