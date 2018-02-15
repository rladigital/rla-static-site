import React from "react";
import { Row, Column } from "rla-components";

import NewsSummary from "./NewsSummary";
import { colors } from "../../theme/theme";
import SectionContainer from "../SectionContainer";
class NewsSection extends React.Component {
    render() {
        const { news } = this.props;
        return (
            <SectionContainer
                color={colors.background}
                background={colors.white}
            >
                <Row>
                    <h1>News &amp; Insights</h1>
                </Row>

                <Row>
                    {news.map(({ node: story }, index) => {
                        return (
                            <Column medium={3} key={index}>
                                <NewsSummary story={story} />
                            </Column>
                        );
                    })}
                </Row>
            </SectionContainer>
        );
    }
}

export default NewsSection;
