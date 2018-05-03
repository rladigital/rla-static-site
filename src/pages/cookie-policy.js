import React from "react";
import { Row, Column } from "rla-components";

import { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import PageDetailContainer from "../components/PageDetailContainer";

export default class CookiePolicyPage extends React.Component {
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
                                <span>Cookie</span> Policy
                            </HeaderBlock>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <p>
                                Cookies are very small text files that are
                                stored on your computer when you visit some
                                websites. We use cookies to make our website
                                easier for you to use. You can disable certain
                                cookies on our site, but this may impact the
                                performance of the sites we provide.
                            </p>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <div id="optanon-cookie-policy" />
                        </Column>
                    </Row>
                </PageDetailContainer>
            </div>
        );
    }
}
