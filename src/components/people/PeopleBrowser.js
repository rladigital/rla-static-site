import React from "react";
import styled from "styled-components";
import { TweenLite } from "gsap";

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
    width: 100px;
    height: 100px;
    position: absolute;
    border-radius: 100px;
    background-size: cover;
    background-position: center;
    transform: translate(-50%, -50%);
`;

const SelectedPerson = styled.div`
    top: 50%;
    left: 50%;
    position: absolute;
    border-radius 1000px;
    background-size: cover;
    background-position: center;
    transform: translate(-50%, -50%);
    z-index: 1;
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
        this.width = document.body.clientWidth;
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
        let size = this.width / 2 - this.width / 4;

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
                                style={{
                                    transform: `scale(${this.getTransform(
                                        index
                                    )})`,
                                    opacity: current == index ? 1 : 0
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
                                                left: coords[index].x,
                                                backgroundImage: `url('${
                                                    person.frontmatter.profile
                                                }')`
                                            }}
                                        >
                                            {person.frontmatter.title}
                                        </Person>
                                    );
                                })}
                            </PersonGroup>
                        );
                    })}
                {selected && (
                    <SelectedPerson
                        style={{
                            width: this.width / 4,
                            height: this.width / 4,
                            backgroundImage: `url('${
                                selected.frontmatter.profile
                            }')`
                        }}
                    >
                        {selected.frontmatter.title}
                    </SelectedPerson>
                )}
                <div style={{ position: "absolute", zIndex: 99 }}>
                    <button onClick={() => this.navigateChunk("prev")}>
                        prev
                    </button>
                    <button onClick={() => this.navigateChunk("next")}>
                        next
                    </button>
                </div>
            </Container>
        );
    }
}

export default PeopleBrowser;
