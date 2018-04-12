import React from "react";
import styled from "styled-components";
import FAIcon from "@fortawesome/react-fontawesome";
import { Row, Column } from "rla-components";
import { transformScale } from "../../helpers/helpers";

import { colors } from "../../theme/theme";
import { hexToInt, scale, random } from "../../helpers/helpers";

const height = 600;

const Wrapper = styled.div`
    overflow: hidden;
`;

const Container = styled.div`
    position: relative;
    height: ${height}px;
    margin-bottom: -80px;
`;

const PersonGroup = styled.div`
    margin-left: 50%;
    margin-top: ${height / 2}px;
    position: absolute;
    transition: transform 1s ease, opacity 1s ease, filter 1s ease;
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

const Control = styled.a`
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

const SelectedBiog = styled.div`
    position: relative;
    font-size: 14px;
`;

class PeopleBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 1,
            coords: null,
            data: null,
            array: [0, 1, 2, 3]
        };
        this.width = window.innerWidth;
    }

    componentDidMount() {
        const { people } = this.props;
        const coords = this.generateCoords(6, 360);
        const data = this.chunkArray(6, this.shuffleArray(people));

        this.setState({
            coords: coords,
            data: data,
            selected: data[0][0].node
        });
    }

    shuffleArray(o) {
        for (
            var j, x, i = o.length;
            i;
            j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
        );
        return o;
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
        let size = 360;

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
        const { coords, data, current, selected } = this.state;
        return (
            <Wrapper>
                <Container>
                    <Row
                        style={{
                            top: "50%",
                            position: "relative"
                        }}
                    >
                        <Column>
                            <Control
                                className="fa-layers fa-fw"
                                onClick={() => this.navigateChunk("prev")}
                                style={{ left: 0 }}
                            >
                                <FAIcon
                                    icon="chevron-left"
                                    transform="shrink-8"
                                />
                                <FAIcon icon={["far", "circle"]} />
                            </Control>

                            <Control
                                className="fa-layers fa-fw"
                                onClick={() => this.navigateChunk("next")}
                                style={{ right: 0 }}
                            >
                                <FAIcon
                                    icon="chevron-right"
                                    transform="shrink-8"
                                />
                                <FAIcon icon={["far", "circle"]} />
                            </Control>
                        </Column>
                    </Row>
                    <div
                        style={{
                            height: height,
                            transform: `scale(${transformScale(1400, 1200)})`
                        }}
                    >
                        {coords &&
                            data.map((row, i) => {
                                return (
                                    <PersonGroup
                                        key={i}
                                        style={{
                                            transform: `scale(${this.getTransform(
                                                i
                                            ) / 1.4})`,
                                            filter: `blur(${
                                                current == i ? 10 : 0
                                            }px)`,
                                            opacity:
                                                current == i
                                                    ? 0.5
                                                    : current + 1 == i ||
                                                      (current ==
                                                          data.length - 1 &&
                                                          i == 0)
                                                        ? 1
                                                        : 0,
                                            pointerEvents:
                                                current + 1 == i
                                                    ? "auto"
                                                    : "none"
                                        }}
                                    >
                                        {row.map(({ node: person }, index) => {
                                            return (
                                                <Person
                                                    key={index}
                                                    onClick={() => {
                                                        current + 1 == i &&
                                                            this.handleSelect(
                                                                person
                                                            );
                                                    }}
                                                    style={{
                                                        top: coords[index].y,
                                                        left: coords[index].x
                                                    }}
                                                >
                                                    <PersonImage
                                                        style={{
                                                            backgroundImage: `url('${
                                                                person
                                                                    .frontmatter
                                                                    .profile
                                                            }')`
                                                        }}
                                                    />
                                                    <PersonTitle>
                                                        {
                                                            person.frontmatter
                                                                .title
                                                        }
                                                    </PersonTitle>
                                                    <PersonRole>
                                                        {
                                                            person.frontmatter
                                                                .role
                                                        }
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
                            />
                        )}
                    </div>
                </Container>

                {selected && (
                    <Row>
                        <Column xlarge={6} large={8} centered>
                            <SelectedText>
                                <SelectedTitle>
                                    {selected.frontmatter.title}
                                </SelectedTitle>
                                <SelectedRole>
                                    {selected.frontmatter.role}
                                </SelectedRole>
                                <SelectedBiog>{selected.excerpt}</SelectedBiog>
                            </SelectedText>
                        </Column>
                    </Row>
                )}
            </Wrapper>
        );
    }
}

export default PeopleBrowser;
