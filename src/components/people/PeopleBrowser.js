import React from "react";
import styled, { css } from "styled-components";
import FAIcon from "@fortawesome/react-fontawesome";
import { Row, Column } from "rla-components";
import { Transition, TransitionGroup } from "react-transition-group";

import { getOriginalImageSrc } from "../../utils/image";
import { transformScale, shuffleArray } from "../../helpers/helpers";
import { colors, breakpoints, spacing } from "../../theme/theme";
import {
    hexToInt,
    scale,
    random,
    chunkArray,
    isMobile,
    isBrowser
} from "../../helpers/helpers";
import { HTMLContent } from "../Content";
import Icon from "../blog/Icon";
import { Z_ASCII } from "zlib";

const height = isBrowser() && isMobile() ? 680 : 600;

let coords;

let direction;

const duration = 800;

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
    transform: translate(-50%, -50%);

    cursor: pointer;
`;

const PersonImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 200px;
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
    font-size: 13px;
    white-space: nowrap;
    margin: 0;
    font-weight: lighter;
    font-family: Avenir, sans-serif;
    letter-spacing: 1px;
`;

const Control = styled(Icon)`
    top: 280px;
    position: absolute;
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
    margin-top: 1em;
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
    font-size: 14px;
    position: relative;
`;

const StyledRow = styled(Row)`
    position: relative;
`;

const Filters = styled.div`
    text-align: center;
`;

const FilterMarker = styled.svg`
    left: 50%;
    bottom: 0;
    position: absolute;
    transform: translateX(-50%);
`;

const FilterGroup = styled.div`
    padding: 1em;
    color: ${colors.white};
    display: inline-block;
    position: relative;
`;

const FilterText = styled.a`
    text-transform: uppercase;
    font-family: ${props => props.theme.headings.fontFamily};
    cursor: pointer;
    ${props =>
        props.active
            ? css`
                  color: ${colors.accent};
              `
            : css`
                  color: ${colors.white};
              `};
`;

if (isBrowser() && !isMobile()) {
    coords,
        (coords = [
            [
                { x: 300, y: -240, r: 120 },
                { x: -380, y: 80, r: 120 },
                { x: 380, y: -10, r: 80 },
                { x: -320, y: -200, r: 100 },
                { x: 330, y: 200, r: 120 }
            ],
            [
                { x: -280, y: -280, r: 120 },
                { x: 320, y: 200, r: 100 },
                { x: -380, y: -10, r: 120 },
                { x: 320, y: -200, r: 100 },
                { x: -330, y: 200, r: 80 }
            ],
            [
                { x: -320, y: -230, r: 120 },
                { x: 240, y: -280, r: 100 },
                { x: 400, y: -50, r: 120 },
                { x: -340, y: 200, r: 100 },
                { x: 300, y: 200, r: 80 }
            ]
        ]);
} else {
    coords = [
        [
            { x: -230, y: -380, r: 150 },
            { x: -200, y: 370, r: 200 },
            { x: 240, y: -340, r: 130 },
            { x: 28, y: -480, r: 180 },
            { x: 140, y: 420, r: 150 }
        ]
    ];
}

const FilterItem = ({ children, active, onClick }) => {
    return (
        <FilterGroup>
            <FilterText active={active} onClick={onClick}>
                {children}
            </FilterText>
            {active && (
                <FilterMarker width={30} viewBox="0 0 60 20">
                    <circle r={4} cx={10} cy={10} fill="currentColor" />
                    <circle r={4} cx={30} cy={10} fill="currentColor" />
                    <circle r={4} cx={50} cy={10} fill="currentColor" />
                </FilterMarker>
            )}
        </FilterGroup>
    );
};

class Fade extends React.Component {
    render() {
        const { in: inProp, children, ...otherProps } = this.props;

        const defaultStyle = {
            transform: "scale(1)",
            transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
            opacity: 0
        };

        const transitionStyles = {
            entering: {
                opacity: 0,
                transform: `scale(${direction == "prev" ? 2 : 0})`
            },
            entered: {
                opacity: 1,
                transform: `scale(1)`
            },
            exiting: {
                opacity: 0,
                transform: `scale(${direction == "prev" ? 0 : 2})`
            }
        };

        return (
            <Transition in={inProp} timeout={duration} {...otherProps}>
                {state => (
                    <PersonGroup
                        id="person-group"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                        {children}
                    </PersonGroup>
                )}
            </Transition>
        );
    }
}

class PeopleBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 0,
            coords: null,
            data: null,
            array: [0, 1, 2, 3],
            widthAdjustment: isBrowser() ? window.innerWidth / 20 : 0,
            // widthAdjustment: 0,
            sizeAdjustment: isBrowser() ? window.innerWidth / 80 : 0,
            randomCoords: this.getRandomCoords(),
            filter: "All",
            filters: this.getFilters()
        };
    }

    componentDidMount() {
        const { people } = this.props;
        let data = chunkArray(5, shuffleArray(people));

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

    navigateChunk(buttonPressed) {
        let { data } = this.state;
        let array = [];
        let current;
        let length = data.length - 1;

        if (buttonPressed == "prev") {
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

        this.setState({
            current: current,
            array: array,
            randomCoords: this.getRandomCoords()
        });

        direction = buttonPressed;
    }

    handleSelect(person) {
        //console.log(person);
        this.setState({ selected: person });
    }

    getRandomCoords() {
        return coords[random(0, coords.length - 1)];
    }

    getTransform(x) {
        const { array } = this.state;

        for (var i = 0; i < array.length; i++) {
            if (array[i] == x) {
                return i;
            }
        }
    }

    // for filtering the list of people by tag
    setFilter(filter) {
        let data;
        const { people } = this.props;
        if (filter == "All") {
            data = people;
        } else {
            data = people.filter(({ node: { frontmatter: { tags } } }) => {
                return Boolean(tags.indexOf(filter) != -1);
            });
        }

        const chunkedData = chunkArray(5, shuffleArray(data));

        this.setState({
            current: 0,
            data: chunkedData,
            filter: filter,
            selected: chunkedData[0][0].node
        });

        direction = "next";
    }

    // for getting all tags and creating filters
    getFilters() {
        const { people } = this.props;

        let filters = ["All"];

        people.map(({ node: { frontmatter: { tags } } }) => {
            tags.map(tag => {
                if (filters.indexOf(tag) == -1) {
                    filters.push(tag);
                }
            });
        });

        return filters;
    }

    render() {
        const {
            data,
            current,
            selected,
            widthAdjustment,
            sizeAdjustment,
            randomCoords,
            filters,
            filter
        } = this.state;

        return [
            <Row>
                <Column>
                    <Filters>
                        {filters &&
                            filters.map(filter => {
                                return (
                                    <FilterItem
                                        active={Boolean(
                                            this.state.filter == filter
                                        )}
                                        onClick={() => this.setFilter(filter)}>
                                        {filter}
                                    </FilterItem>
                                );
                            })}
                    </Filters>
                </Column>
            </Row>,
            <StyledRow>
                <Column large={12}>
                    <Control
                        size={40}
                        icon="chevron-left"
                        transform="shrink-10"
                        iconColor={colors.white}
                        onClick={() => this.navigateChunk("prev")}
                        style={{ left: 0 }}
                    />

                    <Control
                        size={40}
                        icon="chevron-right"
                        transform="shrink-10"
                        iconColor={colors.white}
                        onClick={() => this.navigateChunk("next")}
                        style={{ right: 0 }}
                    />
                </Column>
            </StyledRow>,
            <PeopleBrowserContainer>
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
                    }}>
                    {data && (
                        <TransitionGroup>
                            <Fade key={`people_${filter}_${current}`}>
                                {data[current].map(
                                    ({ node: person }, index) => {
                                        const x = randomCoords[index].x;
                                        const y = randomCoords[index].y;
                                        const r = randomCoords[index].r;

                                        const widthAjustX =
                                            x < 0
                                                ? x - widthAdjustment
                                                : x + widthAdjustment;

                                        return (
                                            <Person
                                                key={index}
                                                style={{
                                                    left: widthAjustX,
                                                    top: y
                                                }}
                                                onClick={() =>
                                                    this.handleSelect(person)
                                                }>
                                                <PersonImage
                                                    style={{
                                                        width: r,
                                                        height: r,
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
                                <SelectedBiog>
                                    <HTMLContent content={selected.html} />
                                </SelectedBiog>
                            </SelectedText>
                        </Column>
                    </Row>
                )}
            </PeopleBrowserContainer>
        ];
    }
}

export default PeopleBrowser;
