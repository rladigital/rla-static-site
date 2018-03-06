import React from "react";
import styled from "styled-components";
import { TweenLite } from "gsap";
import * as PIXI from "pixi.js";

import { colors } from "../../theme/theme";
import { hexToInt, scale, random } from "../../helpers/helpers";

let Canvas = styled.div`
    width: 100%;
    height: 100%;
`;

class PeopleBrowser extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: 0,
            current: 1,
            array: [0, 1, 2]
        };

        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;

        console.log(this.height);
        this.coords;
    }

    componentDidMount() {
        let { size, people, font } = this.props;

        // Create pixi app
        this.app = new PIXI.Application({
            width: this.width,
            height: 1000,
            forceCanvas: true,
            backgroundColor: hexToInt(colors.background)
        });

        let perRow = 6;

        this.coords = this._coords(perRow, 360);

        let chunks = this._chunk(people, perRow);

        // The controls
        let controls = this._controls(size);
        this.app.stage.addChild(controls);

        // The items
        let items = this._items(chunks, this.coords, font);
        this.app.stage.addChild(items);

        // The details area
        //this.details = this._details(size);
        //this.app.stage.addChild(this.details);

        // Add to canvas
        this.canvas.appendChild(this.app.view);
    }

    _details(size, data) {
        let group = new PIXI.Container();
        let circle = new PIXI.Graphics();
        let image = PIXI.Sprite.fromImage(data.profile);
        let x = this.width / 2;
        let y = this.height / 2;

        circle
            .beginFill(`0xffffff`)
            .drawCircle(0, 0, size / 2)
            .endFill();

        circle.x = x;
        circle.y = y;

        image.anchor.set(0.5);
        image.x = x;
        image.y = y;
        image.width = size;
        image.height = size;

        image.mask = circle;

        group.addChild(circle);
        group.addChild(image);

        return group;
    }

    _controls(size) {
        let group = new PIXI.Container();
        let buttonSize = 50;
        let next = _button(buttonSize);
        let prev = _button(buttonSize);

        // Size
        next.y = prev.y = size / 2 + this.height / 2 + buttonSize;

        // Position
        next.x = this.width / 2 + buttonSize;

        prev.x = this.width / 2 - buttonSize;

        // Add to group
        group.addChild(prev);
        group.addChild(next);

        // Pointers normalize touch and mouse
        next.on("pointerdown", () => this.handleClick("next"));
        prev.on("pointerdown", () => this.handleClick("prev"));

        function _button(buttonSize) {
            let circle = new PIXI.Graphics();

            circle
                .beginFill(`0xffffff`)
                .drawCircle(0, 0, buttonSize / 2)
                .endFill();

            // Opt-in to interactivity
            circle.interactive = true;

            // Shows hand cursor
            circle.buttonMode = true;

            return circle;
        }

        return group;
    }

    _items(people, coords, font) {
        let dotSize = 50;
        let main = 4;
        let group = new PIXI.Container();

        this.items = new Array();

        for (var i = 0; i < people.length; i++) {
            let alpha = this._alpha(i, this.state.array.length);

            this.items[i] = new PIXI.Container();

            // Items position
            this.items[i].x = this.width / 2;
            this.items[i].y = this.height / 2;

            // Items alpha
            this.items[i].alpha = alpha;

            // Initial scale
            let scale = 0;
            for (var k = 0; k < this.state.array.length; k++) {
                if (i == this.state.array[k]) {
                    scale = k;
                }
            }

            this.items[i].scale.x = this.items[i].scale.y = scale;

            for (var j = 0; j < people[i].length; j++) {
                (index => {
                    let person = new PIXI.Container();
                    let data = people[i][j].node.frontmatter;

                    // Title
                    let titleStyle = new PIXI.TextStyle({
                        fontFamily: font,
                        fontSize: 16,
                        fontWeight: 700,
                        fill: "#ffffff"
                    });
                    let title = new PIXI.Text(
                        data.title.toUpperCase(),
                        titleStyle
                    );

                    title.x = 0 - title.width / 2;
                    title.y = dotSize + 10;

                    person.addChild(title);

                    // Role
                    let roleStyle = new PIXI.TextStyle({
                        fontFamily: font,
                        fontSize: 12,
                        fill: "#ffffff"
                    });
                    let role = new PIXI.Text(
                        data.role.toUpperCase(),
                        roleStyle
                    );

                    role.x = 0 - role.width / 2;
                    role.y = dotSize + 30;

                    person.addChild(role);

                    // Image
                    var image = PIXI.Sprite.fromImage(data.profile);
                    image.x = image.y = -dotSize;
                    image.width = image.height = dotSize * 2;

                    person.addChild(image);

                    // The circle
                    let circle = new PIXI.Graphics();
                    circle.beginFill(`0xffffff`);
                    circle.drawCircle(0, 0, dotSize);
                    person.addChild(circle);

                    // Ajust the group
                    person.x = coords[index].x;
                    person.y = coords[index].y;

                    // Mask
                    image.mask = circle;

                    // Clickable
                    // Opt-in to interactivity
                    person.interactive = true;

                    // Shows hand cursor
                    person.buttonMode = true;

                    person.on("pointerdown", () => this._selected(data));

                    this.items[i].addChild(person);
                })(j);
            }
            group.addChild(this.items[i]);
        }
        return group;
    }

    _coords(count, r) {
        let main = 1;
        let theta = Math.PI / count;
        let items = new Array();
        let size = 300;

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

    _chunk(myArray, chunk_size) {
        var i = 0;
        var chunk;
        var tempArray = [];

        for (i = 0; i < myArray.length; i += chunk_size) {
            chunk = myArray.slice(i, i + chunk_size);
            tempArray.push(chunk);
        }

        return tempArray;
    }

    _alpha(i, length) {
        return i == 0 || i == length - 1 ? 0 : 1;
    }

    handleClick(direction) {
        let array = [];
        let current;

        if (direction == "next") {
            current = this.state.current + 1;
            if (current == this.items.length + 1) {
                current = 0;
            }
        } else {
            current = this.state.current - 1;
            if (current == -1) {
                current = this.items.length;
            }
        }

        array[0] = current - 1 == -1 ? this.items.length : current - 1;
        array[1] = current;
        array[2] = current + 1 == this.items.length + 1 ? 0 : current + 1;

        console.log(array);

        this.setState({ current: array[1], array: array });

        // handle the positioning
        for (var i = 0; i < this.state.array.length; i++) {
            let alpha = this._alpha(i, this.state.array.length);

            for (var j = 0; j < this.items.length; j++) {
                if (j == this.state.array[i]) {
                    let scale = i;

                    // Alpha
                    TweenLite.to(this.items[j], 1, {
                        alpha: alpha
                    });

                    // Scale
                    TweenLite.to(this.items[j].scale, 1, {
                        x: scale,
                        y: scale
                    });
                }
            }
        }
    }

    _selected(data) {
        if (this.details) {
            this.details.destroy();
        }
        this.details = this._details(this.props.size, data);
        this.app.stage.addChild(this.details);
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <Canvas
                    innerRef={input => {
                        this.canvas = input;
                    }}
                />
            </div>
        );
    }
}

export default PeopleBrowser;
