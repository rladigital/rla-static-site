import React from "react";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";

import HeaderBlock from "../HeaderBlock";
import { colors, spacing } from "../../theme/theme";
import missionMap from "../../img/mission-map.png";

const Container = styled.div`
    background-color: ${colors.accent};
    background-image: url('${missionMap}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top -2vw right -8vw;
    padding: 2em 0 5em;
`;

const P = styled.p`
    margin-bottom: 2em;
`;

const MissionSection = ({ percentage, text }) => (
    <Container>
        <Row>
            <Column large={8} xlarge={6}>
                <HeaderBlock
                    textAlign="left"
                    accentColor={colors.background}
                    baseColor={colors.white}
                    padding={{
                        top: 4,
                        right: 0,
                        bottom: 2,
                        left: 0
                    }}
                    fontSize={3.6}
                >
                    Be&nbsp;part&nbsp;of <span>something</span>
                    <br /> big
                </HeaderBlock>
            </Column>
        </Row>
        <Row>
            <Column xlarge={5}>
                <P>
                    <strong>
                        We are fast becoming the UK’s leading, most respected
                        Agency group. Delivering outstanding results for our
                        clients wherever they operate.
                    </strong>
                </P>
                <P>
                    We achieve this by providing impartial advice and
                    challenging industry conventions. We also harness innovative
                    technologies and incredible creativity.
                </P>
                <Button hollow={true} size="large" color="white">
                    More About the Mission &rarr;
                </Button>
            </Column>
        </Row>
    </Container>
);

export default MissionSection;
