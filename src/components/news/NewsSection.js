import React from "react";
import NewsSummary from "./NewsSummary";
import { Row, Column } from "rla-components";

class NewsSection extends React.Component {
    render() {
        const { news } = this.props;
        return (
            <div>
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
            </div>
        );
    }
}

export default NewsSection;
