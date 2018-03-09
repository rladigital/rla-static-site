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
    padding: 30px 0 0;
`;

class PeopleSection extends React.Component {
    render() {
        const { people } = this.props;

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
                    people={people
                        .concat(people)
                        .concat(people)
                        .concat(people)
                        .concat(people)
                        .concat(people)
                        .concat(people)
                        .concat(people)}
                    size={500}
                />
            </SectionContainer>
        );
    }
}

export default PeopleSection;
