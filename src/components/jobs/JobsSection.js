import React from "react";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import styled from "styled-components";
import { isMobile, isBrowser } from "../../helpers/helpers";

import JobSummary from "./JobSummary";
import { colors, spacing } from "../../theme/theme";
import PeoplePlaceholder from "../blog/placeholders/People";
import NewsPlaceholder from "../blog/placeholders/News";

const StyledButton = Button.extend`
    color: ${colors.background};
    margin-top: 0em;
`;

class JobsSection extends React.Component {
    render() {
        const { jobs, news } = this.props;

        return (
            <div>
                <Row>
                    <Column medium={6} large={7} xlarge={9} collapse>
                        <Row collapse>
                            <Column>
                                <JobSummary
                                    job={jobs[0].node}
                                    height={36}
                                    centred
                                />
                            </Column>
                        </Row>

                        {!isMobile() && (
                            <Row collapse>
                                <Column large={6} xlarge={4}>
                                    <NewsPlaceholder
                                        height={37.5}
                                        news={news}
                                    />
                                </Column>
                                <Column large={6} xlarge={8}>
                                    {jobs[2] && (
                                        <JobSummary
                                            job={jobs[2].node}
                                            height={18}
                                        />
                                    )}
                                    {jobs[3] && (
                                        <JobSummary
                                            job={jobs[3].node}
                                            height={18}
                                        />
                                    )}
                                </Column>
                            </Row>
                        )}

                        {isMobile() && (
                            <Row collapse>
                                <Column>
                                    {jobs[2] && (
                                        <JobSummary
                                            job={jobs[2].node}
                                            height={18}
                                        />
                                    )}
                                    {jobs[3] && (
                                        <JobSummary
                                            job={jobs[3].node}
                                            height={18}
                                        />
                                    )}
                                </Column>
                            </Row>
                        )}
                    </Column>
                    <Column medium={6} large={5} xlarge={3}>
                        {jobs[1] && (
                            <JobSummary job={jobs[1].node} height={18} />
                        )}
                        <PeoplePlaceholder height={36} />
                        {jobs[4] && (
                            <JobSummary job={jobs[4].node} height={18} />
                        )}
                    </Column>
                </Row>
            </div>
        );
    }
}

export default JobsSection;
