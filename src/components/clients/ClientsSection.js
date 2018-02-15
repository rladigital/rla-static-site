import React from "react";
import { Row, Column } from "rla-components";

import ClientSummary from "./ClientSummary";
import { colors } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

class ClientsSection extends React.Component {
    render() {
        const { clients } = this.props;
        return (
            <SectionContainer
                color={colors.background}
                background={colors.white}
            >
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
            </SectionContainer>
        );
    }
}

export default ClientsSection;
