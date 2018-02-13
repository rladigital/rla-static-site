import React from "react";
import ClientSummary from "./ClientSummary";
import { Row, Column } from "rla-components";

class ClientsSection extends React.Component {
    render() {
        const { clients } = this.props;
        return (
            <div>
                <Row>
                    <h1>30 Years of Delivering</h1>
                    <h2>Strategic, Profitable Communications</h2>
                </Row>

                <Row>
                    {clients.map(({ node: client }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <ClientSummary client={client} />
                            </Column>
                        );
                    })}
                </Row>
                <Row>
                    <p>View all</p>
                </Row>
            </div>
        );
    }
}

export default ClientsSection;
