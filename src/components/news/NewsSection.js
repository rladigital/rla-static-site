import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";

import HeaderBlock from "../HeaderBlock";
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
                    <Column medium={6} collapse>
                        <HeaderBlock
                            baseColor={colors.background}
                            fontSize={4}
                            textAlign="left"
                            padding={{
                                top: 1,
                                right: 0,
                                bottom: 0,
                                left: 0
                            }}
                        >
                            News &amp; <span>Insights</span>
                        </HeaderBlock>
                        <Link to="news">
                            <Button
                                hollow={true}
                                size="large"
                                color={colors.background}
                            >
                                See More News &rarr;
                            </Button>
                        </Link>
                        {news[0] && <NewsSummary story={news[0].node} />}
                    </Column>
                    <Column medium={6} collapse>
                        {news[1] && (
                            <NewsSummary story={news[1].node} minHeight={24} />
                        )}
                    </Column>
                </Row>
            </SectionContainer>
        );
    }
}

export default NewsSection;
