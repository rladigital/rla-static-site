import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import ClientSummary from "./ClientSummary";
import { colors, spacing } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const StyledButton = Button.extend`
    color: ${colors.white};
    margin-top: ${spacing.padding}em;
`;

class ClientsSection extends React.Component {
    render() {
        const { clients } = this.props;
        return (
            <div>
                <SectionContainer
                    color={colors.background}
                    background={colors.white}
                >
                    <Row>
                        <HeaderBlock baseColor={colors.background}>
                            30 Years of Delivering<br />
                            <span>Strategic, Profitable Communications</span>
                        </HeaderBlock>
                    </Row>

                    <Row>
                        {clients.slice(0, 6).map(({ node: client }, index) => {
                            return (
                                <Column medium={4} key={index} collapse>
                                    <ClientSummary
                                        client={client}
                                        height={420}
                                    />
                                </Column>
                            );
                        })}
                    </Row>
                </SectionContainer>
                <SectionContainer
                    color={colors.white}
                    background={colors.background}
                >
                    <Row style={{ textAlign: "center" }}>
                        <Link to="work">
                            <StyledButton
                                hollow={true}
                                size="large"
                                color="accent"
                            >
                                See All Case Studies &rarr;
                            </StyledButton>
                        </Link>
                    </Row>
                </SectionContainer>
            </div>
        );
    }
}

export default ClientsSection;
