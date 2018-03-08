import React from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";

import { colors } from "../../theme/theme";
import { hexToInt, scale, random } from "../../helpers/helpers";

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 20,
    display: "inline-block",
    backgroundColor: "#8787d8"
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
};

const Fade = ({ in: inProp }) => (
    <Transition in={inProp} timeout={duration}>
        {state => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
            >
                I'm A fade Transition!
            </div>
        )}
    </Transition>
);

const Container = styled.div`
    position: relative;
    height: 600px;
`;

const PersonGroup = styled.div`
    margin-left: 50%;
    margin-top: 300px;
    position: absolute;
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
`;

class PeopleBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            current: 0,
            coords: null,
            data: null,
            show: false
        };
        this.width = document.body.clientWidth;
        this.height = 600;
    }

    componentDidMount() {
        const { people } = this.props;
        const coords = this.generateCoords(6, 360);
        const data = this.chunkArray(6, people);

        console.log(data);

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
        let current;

        if (direction == "next") {
            current = this.state.current + 1;
            if (current == data.length) {
                current = 0;
            }
        } else {
            current = this.state.current - 1;
            if (current == -1) {
                current = data.length;
            }
        }

        this.setState({ current: current });
    }

    handleSelect(person) {
        console.log(person);
        this.setState({ selected: person });
    }

    handleToggle() {
        console.log("toggle");
        this.setState(({ show }) => ({
            show: !show
        }));
    }

    render() {
        const { coords, data, current, selected, show } = this.state;
        return (
            <Container>
                <Fade in={!!show} />
                {coords && (
                    <PersonGroup>
                        {data[current].map(({ node: person }, index) => {
                            return (
                                <Person
                                    key={index}
                                    onClick={() => this.handleSelect(person)}
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
                )}
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
                <button onClick={() => this.navigateChunk("prev")}>prev</button>
                <button onClick={() => this.navigateChunk("next")}>next</button>
                <button onClick={() => this.handleToggle()}>toggle</button>
            </Container>
        );
    }
}

export default PeopleBrowser;
