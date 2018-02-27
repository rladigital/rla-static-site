import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";

import HeaderBlock from "../HeaderBlock";
import NewsSummary from "./NewsSummary";
import { colors } from "../../theme/theme";
import SectionContainer from "../SectionContainer";

const HeaderContainer = styled.div`
    padding: 2rem 0;
    height: ${props => props.minHeight}vw;
`;

class NewsSection extends React.Component {
    render() {
        const { news } = this.props;
        return (
            <SectionContainer
                color={colors.background}
                background={colors.white}
                padding={0}
            >
                <div style={{ position: "absolute" }}>
                    <Row>
                        <Column medium={6}>
                            <HeaderContainer minHeight={20}>
                                <HeaderBlock
                                    baseColor={colors.background}
                                    fontSize={5}
                                    textAlign="left"
                                    padding={{
                                        top: 1,
                                        right: 0,
                                        bottom: 2,
                                        left: 0
                                    }}
                                >
                                    News &amp; Insights
                                </HeaderBlock>
                                <Link to="news">
                                    <Button
                                        hollow={true}
                                        size="large"
                                        color="background"
                                    >
                                        See All News &rarr;
                                    </Button>
                                </Link>
                            </HeaderContainer>
                        </Column>
                    </Row>
                </div>
                <Row expanded collapse>
                    <Column medium={6} collapse>
                        <Row>
                            <HeaderContainer minHeight={20} />
                        </Row>
                        {news[0] && (
                            <NewsSummary story={news[0].node} minHeight={20} />
                        )}
                    </Column>
                    <Column medium={6} collapse>
                        {news[1] && (
                            <NewsSummary story={news[1].node} minHeight={40} />
                        )}
                    </Column>
                </Row>
            </SectionContainer>
        );
    }
}

export default NewsSection;
