import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { serveStatic } from "../../helpers/helpers";
import HeaderBlock from "../HeaderBlock";
import SectionContainer from "../SectionContainer";
if (serveStatic()) {
    var PeopleBrowser = require("./PeopleBrowserStatic");
} else {
    var PeopleBrowser = require("./PeopleBrowser");
}

const StyledP = styled.p`
    text-align: center;
    padding: 30px 0 50px;
`;

class PeopleSection extends React.Component {
    render() {
        const { people, font } = this.props;

        let full = people.concat(people);
        return (
            <SectionContainer>
                <HeaderBlock>
                    <span>People</span> at our Core
                </HeaderBlock>

                <Row>
                    <Column large={7} centered>
                        <StyledP>
                            We deliver fresh thinking and innovative ideas that
                            give our clients the edge over their competitors.
                            Our passion and drive to know your business inside
                            out and back to front enables us to work alongside
                            you and become an inseparable extension of your
                            marketing team.
                        </StyledP>
                    </Column>
                </Row>

                <PeopleBrowser
                    people={full
                        .concat(full)
                        .concat(full)
                        .concat(full)}
                    size={500}
                    font={font}
                />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
