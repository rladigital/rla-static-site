import React from "react";
import Link from "gatsby-link";
import graphql from "graphql";
import { Row, Column } from "rla-components";
import "animate.css/animate.min.css";

import theme from "../../theme/theme";
import generateLayout from "../../theme/generatePostLayout";
import LoadMore from "../../components/blog/LoadMore";

import { randomChunkArray, random } from "../../helpers/helpers";

const rowsAdvance = 3;
export default class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { news } = this.props;

        const chunks = randomChunkArray(news, 2, 4);

        const layout = generateLayout(chunks);

        this.setState({
            rows: rowsAdvance,
            chunkedNews: chunks,
            layout: layout
        });

        //console.log(chunks);
    }

    handleClick() {
        this.setState({
            rows: this.state.rows + rowsAdvance
        });
    }

    render() {
        const { chunkedNews, rows, layout } = this.state;

        return (
            <div>
                <Row expanded collapse>
                    {chunkedNews &&
                        chunkedNews.slice(0, rows).map((items, i) => {
                            return layout[i](items);
                        })}
                </Row>

                {chunkedNews &&
                    chunkedNews.length > rows && (
                        <LoadMore onClick={() => this.handleClick()}>
                            Load More
                        </LoadMore>
                    )}
            </div>
        );
    }
}
