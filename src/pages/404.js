import React from "react";
import { Row, Column } from "rla-components";

import { colors, spacing } from "../theme/theme";
import HeaderBlock from "../components/HeaderBlock";
import PageDetailContainer from "../components/PageDetailContainer";
import Link from "gatsby-link";

export default class NotFoundPage extends React.Component {
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
                                <span>Sorry</span> Page Not Found
                            </HeaderBlock>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <p>The page you requested could not be found.</p>

                            <p>
                                Try visiting the <Link to="/">Home Page</Link>{" "}
                                and having a browse.
                            </p>
                        </Column>
                    </Row>
                </PageDetailContainer>
            </div>
        );
    }
}
