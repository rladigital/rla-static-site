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
            <Column large={8} xlarge={4}>
                <HeaderBlock
                    textAlign="left"
                    accentColor={colors.background}
                    baseColor={colors.white}
                    padding={{
                        top: 4,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                    fontSize={3.6}
                >
                    LOCAL <span>EXPERTISE</span> WITH GLOBAL REACH
                </HeaderBlock>
            </Column>
        </Row>
        <Row>
            <Column large={6} xlarge={4}>
                <P>
                    Our marketing know-how knows no bounds. Helping our clients
                    connect with their customers all across the world is
                    business as usual for us. With extensive experience working
                    with Euro Repar Car Service and launching Scanias in South
                    Africa, we’ll be only too happy to discuss your wider
                    interests.
                </P>
                <P>
                    A major advantage we offer is that being part of The
                    Mission, one of the UK’s leading and most respected Agency
                    Groups, all the additional specialist skills and resources
                    you could need will always be available.
                </P>
                <a href="http://www.themission.co.uk/" target="_blank">
                    <Button
                        hollow={true}
                        size="large"
                        color="white"
                        padding={2}
                        borderWidth={3}
                    >
                        More About the Mission &rarr;
                    </Button>
                </a>
            </Column>
        </Row>
    </Container>
);

export default MissionSection;
