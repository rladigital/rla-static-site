import React from "react";
import styled from "styled-components";
import { TweenLite } from "gsap";
import FAIcon from "@fortawesome/react-fontawesome";

import { colors } from "../../theme/theme";
import { hexToInt, scale, random } from "../../helpers/helpers";

const Container = styled.div`
    position: relative;
    height: 600px;
`;

const PersonGroup = styled.div`
    margin-left: 50%;
    margin-top: 300px;
    position: absolute;
    transition: transform 1s ease, opacity 1s ease;
`;

const Person = styled.div`
    position: absolute;
    text-align: center;
    transform: translate(-50%, -50%);
    width: 200px;
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
    font-size: 12px;
    white-space: nowrap;
`;
const PersonRole = styled.h4`
    font-size: 10px;
    white-space: nowrap;
`;

const Controls = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
`;

const Control = styled.a`
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
`;

const Selected = styled.div`
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    position: absolute;
    border-radius 200px;
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
        background: linear-gradient(to bottom, transparent , ${
            colors.background
        } 80%);
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
    position: absolute;
    bottom: 0;
`;

const SelectedTitle = styled.h1`
    position: relative;
    font-size: 30px;
`;

const SelectedRole = styled.h1`
    position: relative;
    font-size: 15px;
    font-weight: normal;
`;

const SelectedBiog = styled.div`
    position: relative;
    font-size: 14px;
    padding: 5px 40px 30px;
`;

class PeopleBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 1,
            coords: null,
            data: null,
            array: [0, 1, 2]
        };
        this.width = window.innerWidth;
        this.height = 600;
    }

    componentDidMount() {
        const { people } = this.props;
        const coords = this.generateCoords(6, 360);
        const data = this.chunkArray(6, people);

        this.setState({
            coords: coords,
            data: data,
            selected: data[0][0].node
        });
    }

    chunkArray(chunk_size, myArray) {
        var i = 0;
        var chunk;
        var tempArray = [];

        for (i = 0; i < myArray.length; i += chunk_size) {
            chunk = myArray.slice(i, i + chunk_size);
            tempArray.push(chunk);
        }

        return tempArray;
    }

    generateCoords(count, r) {
        let main = 1;
        let theta = Math.PI / count;
        let items = new Array();
        let size = 320;

        for (var i = 0; i < count; i++) {
            let angle =
                (i >= count / 2 ? theta * i : theta * (i - count / 2)) -
                Math.PI / count * 4;
            let x = size * Math.cos(angle); // center point + radius * angle
            let y = size * Math.sin(angle);

            items[i] = {
                x: x,
                y: y
            };
        }

        return items;
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
        const { coords, data, current, selected } = this.state;
        return (
            <Container>
                {coords &&
                    data.map((row, index) => {
                        return (
                            <PersonGroup
                                key={index}
                                style={{
                                    transform: `scale(${this.getTransform(
                                        index
                                    )})`,
                                    opacity: current == index ? 1 : 0,
                                    pointerEvents:
                                        current == index ? "auto" : "none"
                                }}
                            >
                                {row.map(({ node: person }, index) => {
                                    return (
                                        <Person
                                            key={index}
                                            onClick={() =>
                                                this.handleSelect(person)
                                            }
                                            style={{
                                                top: coords[index].y,
                                                left: coords[index].x
                                            }}
                                        >
                                            <PersonImage
                                                style={{
                                                    backgroundImage: `url('${
                                                        person.frontmatter
                                                            .profile
                                                    }')`
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
                                })}
                            </PersonGroup>
                        );
                    })}
                {selected && (
                    <Selected
                        style={{
                            backgroundImage: `url('${
                                selected.frontmatter.profile
                            }')`
                        }}
                    >
                        <SelectedText>
                            <SelectedTitle>
                                {selected.frontmatter.title}
                            </SelectedTitle>
                            <SelectedRole>
                                {selected.frontmatter.role}
                            </SelectedRole>
                            <SelectedBiog>{selected.excerpt}</SelectedBiog>
                        </SelectedText>
                    </Selected>
                )}
                <Controls>
                    <Control
                        className="fa-layers fa-fw"
                        onClick={() => this.navigateChunk("next")}
                    >
                        <FAIcon icon="chevron-up" transform="shrink-8" />
                        <FAIcon icon={["far", "circle"]} />
                    </Control>

                    <Control
                        className="fa-layers fa-fw"
                        onClick={() => this.navigateChunk("prev")}
                    >
                        <FAIcon icon="chevron-down" transform="shrink-8" />
                        <FAIcon icon={["far", "circle"]} />
                    </Control>
                </Controls>
            </Container>
        );
    }
}

export default PeopleBrowser;
