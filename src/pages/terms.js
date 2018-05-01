import React from "react";
import { Row, Column } from "rla-components";

import { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import PageDetailContainer from "../components/PageDetailContainer";

export default class TermsPage extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            window.dispatchEvent(new Event("load"));
        }, 0);
    }
    render() {
        const { transition } = this.props;
        return (
            <div style={transition && transition.style}>
                <PageDetailContainer>
                    <Row>
                        <Column>
                            <HeaderBlock
                                textAlign="left"
                                baseColor={colors.background}
                                fontSize={3}
                                padding={{
                                    top: 0.6,
                                    right: 0,
                                    bottom: 2.4,
                                    left: 0
                                }}
                            >
                                <span>Terms </span>& Conditions
                            </HeaderBlock>
                        </Column>
                    </Row>

                    <Row>
                        <Column />
                    </Row>
                </PageDetailContainer>
            </div>
        );
    }
}
