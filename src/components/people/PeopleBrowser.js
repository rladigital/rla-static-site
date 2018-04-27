import React from "react";
import styled from "styled-components";
import FAIcon from "@fortawesome/react-fontawesome";
import { Row, Column } from "rla-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { getOriginalImageSrc } from "../../utils/image";
import { transformScale, shuffleArray } from "../../helpers/helpers";
import { colors, breakpoints } from "../../theme/theme";
import {
    hexToInt,
    scale,
    random,
    randomChunkArray,
    isMobile,
    isBrowser
} from "../../helpers/helpers";
import { HTMLContent } from "../Content";

const height = isBrowser() && isMobile() ? 680 : 600;

const duration = 800;

const defaultStyle = {
    transform: "scale(1)",
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    opacity: 0
};

const transitionStyles = {
    entering: {
        opacity: 0,
        transform: "scale(0)"
    },
    entered: {
        opacity: 1,
        transform: "scale(1)"
    },
    exiting: {
        opacity: 0,
        transform: "scale(2)"
    }
};

const PeopleBrowserContainer = styled.div`
    position: relative;
    //overflow: hidden;
`;

const PersonGroup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Person = styled.div`
    position: absolute;
    text-align: center;
    transform: translateX(-50%);

    cursor: pointer;
`;

const PersonImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-size: cover;
    background-position: center;
    display: inline-block;
`;

const PersonTitle = styled.h3`
    font-size: 16px;
    white-space: nowrap;
    margin: 0 0 0.2rem;
`;
const PersonRole = styled.h4`
    font-size: 14px;
    white-space: nowrap;
    margin: 0;
`;

const Control = styled.a`
    top: 280px;
    position: absolute;
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
    z-index: 1;
`;

const Selected = styled.div`
    top: 50%;
    left: 50%;
    width: 450px;
    height: 450px;
    position: absolute;
    border-radius 400px;
    background-size: cover;
    background-position: center;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 1;
    transition: background-image ease 0.25s;
    &:before{
        content: " ";
        width: 100%;
        height: 100%;
        position: absolute;
        top: -20px;
        left: -20px;
        border-radius: 100%;
        padding: 20px;
        box-shadow: inset 0px 0px 0 3px ${colors.accent};
    }
`;

const SelectedText = styled.div`
    width: 100%;
    text-align: center;
    padding: 0 0 2em;
`;

const SelectedTitle = styled.h1`
    margin-bottom: 0.5em;
    position: relative;
    font-size: 30px;
`;

const SelectedRole = styled.h1`
    margin-bottom: 1em;
    position: relative;
    font-size: 15px;
    font-weight: normal;
`;

const SelectedBiog = styled.p`
    position: relative;
`;

const Fade = ({ in: inProp, children, ...otherProps }) => (
    <Transition in={inProp} timeout={duration} {...otherProps}>
        {state => (
            <PersonGroup
                id="person-group"
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
            >
                {children}
            </PersonGroup>
        )}
    </Transition>
);

class PeopleBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 1,
            coords: null,
            data: null,
            array: [0, 1, 2, 3],
            widthAdjustment: isBrowser() ? window.innerWidth / 10 : 0,
            sizeAdjustment: isBrowser() ? window.innerWidth / 25 : 0
        };
    }

    componentDidMount() {
        const { people } = this.props;
        let data = randomChunkArray(shuffleArray(people), 3, 5);

        // Don't allow singles
        if (data[data.length - 1].length == 1) {
            let tempArray = data.splice(-1);
            data[data.length - 1].concat(tempArray);
        }

        this.setState({
            data: data,
            selected: data[0][0].node
        });
    }

    navigateChunk(direction) {
        let { data } = this.state;
        let array = [];
        let current;
        let length = data.length - 1;

        if (direction == "prev") {
            current = this.state.current + 1;
            if (current == length + 1) {
                current = 0;
            }
        } else {
            current = this.state.current - 1;
            if (current == -1) {
                current = length;
            }
        }

        array[0] = current - 1 < 0 ? length : current - 1;
        array[1] = current;
        array[2] = current + 1 > length ? 0 : current + 1;
        array[3] = current + 1 > length ? 1 : current + 2;

        this.setState({ current: current, array: array });
    }

    handleSelect(person) {
        //console.log(person);
        this.setState({ selected: person });
    }

    getTransform(x) {
        const { array } = this.state;

        for (var i = 0; i < array.length; i++) {
            if (array[i] == x) {
                return i;
            }
        }
    }

    render() {
        console.log(this.props);

        const {
            data,
            current,
            selected,
            widthAdjustment,
            sizeAdjustment
        } = this.state;
        let coords;

        if (isBrowser() && !isMobile()) {
            coords = [
                { x: -280 - widthAdjustment, y: -380, r: 150 + sizeAdjustment },
                { x: 320 + widthAdjustment, y: 100, r: 150 + sizeAdjustment },
                { x: -380 - widthAdjustment, y: -110, r: 90 + sizeAdjustment },
                { x: 320 + widthAdjustment, y: -300, r: 130 + sizeAdjustment },
                { x: -330 - widthAdjustment, y: 100, r: 130 + sizeAdjustment }
            ];
        } else {
            coords = [
                { x: -230, y: -550, r: 150 },
                { x: -200, y: 270, r: 200 },
                { x: 240, y: -500, r: 130 },
                { x: 28, y: -640, r: 180 },
                { x: 140, y: 320, r: 150 }
            ];
        }

        return (
            <PeopleBrowserContainer>
                <Row
                    style={{
                        position: "relative"
                    }}
                >
                    <Column>
                        <Control
                            className="fa-layers fa-fw"
                            onClick={() => this.navigateChunk("prev")}
                            style={{ left: 0 }}
                        >
                            <FAIcon icon="chevron-left" transform="shrink-8" />
                            <FAIcon icon={["far", "circle"]} />
                        </Control>

                        <Control
                            className="fa-layers fa-fw"
                            onClick={() => this.navigateChunk("next")}
                            style={{ right: 0 }}
                        >
                            <FAIcon icon="chevron-right" transform="shrink-8" />
                            <FAIcon icon={["far", "circle"]} />
                        </Control>
                    </Column>
                </Row>
                <div
                    style={{
                        height: height,
                        position: "relative",
                        transform: `scale(${
                            isBrowser() && isMobile()
                                ? transformScale(750, 340)
                                : transformScale(1200, 1100)
                        })`,
                        marginBottom: -50
                    }}
                >
                    {data && (
                        <TransitionGroup>
                            <Fade key={`people_${current}`}>
                                {data[current].map(
                                    ({ node: person }, index) => {
                                        return (
                                            <Person
                                                key={index}
                                                style={{
                                                    top: coords[index].y,
                                                    left: coords[index].x
                                                }}
                                                onClick={() =>
                                                    this.handleSelect(person)
                                                }
                                            >
                                                <PersonImage
                                                    style={{
                                                        width: coords[index].r,
                                                        height: coords[index].r,
                                                        backgroundImage: `url('${getOriginalImageSrc(
                                                            person.frontmatter
                                                                .profile
                                                        )}')`
                                                    }}
                                                />
                                                <PersonTitle>
                                                    {person.frontmatter.title}
                                                </PersonTitle>
                                                <PersonRole>
                                                    {person.frontmatter.role}
                                                </PersonRole>
                                            </Person>
                                        );
                                    }
                                )}
                            </Fade>
                        </TransitionGroup>
                    )}
                    {selected && (
                        <Selected
                            style={{
                                backgroundImage: `url('${getOriginalImageSrc(
                                    selected.frontmatter.profile
                                )}')`
                            }}
                        />
                    )}
                </div>
                {selected && (
                    <Row style={{ marginTop: "-100px" }}>
                        <Column xlarge={6} large={8} centered>
                            <SelectedText>
                                <SelectedTitle>
                                    {selected.frontmatter.title}
                                </SelectedTitle>
                                <SelectedRole>
                                    {selected.frontmatter.role}
                                </SelectedRole>
                                <HTMLContent content={selected.html} />
                            </SelectedText>
                        </Column>
                    </Row>
                )}
            </PeopleBrowserContainer>
        );
    }
}

export default PeopleBrowser;
