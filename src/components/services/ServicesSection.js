import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";

import { TweenLite } from "gsap";
import * as PIXI from "pixi.js";

import HeaderBlock from "../HeaderBlock";
import ServiceSummary from "./ServiceSummary";
import SectionContainer from "../SectionContainer";

import { colors } from "../../theme/theme";
import { hexToInt } from "../../helpers/helpers";

let Container = styled.div`
    position: relative;
`;

let Canvas = styled.div`
    width: 100%;
    height: 100%;
`;

class ServicesSection extends React.Component {
    constructor() {
        super();

        this.state = {
            current: 0
        };

        this.width = document.body.clientWidth;
        this.height = 500;
        this.curveStart = 390;
        this.curveStop = 900;
        this.coords;
    }
    componentDidMount() {
        let items = this.props.services;
        let { font } = this.props;

        // Create pixi app
        let app = new PIXI.Application({
            width: this.width,
            height: this.height,
            forceCanvas: true,
            backgroundColor: hexToInt(colors.background)
        });

        // create coords
        this.coords = this._coords(30, items.length);

        // add circle
        let circle = this._circle();
        app.stage.addChild(circle);

        // add gradient
        let gradient = this._gradient();
        app.stage.addChild(gradient);

        // add items
        app.stage.addChild(this._items(items, font));

        gradient.mask = circle;

        // Add to canvas
        this.canvas.appendChild(app.view);
    }

    _items(items, font) {
        let group = new PIXI.Container();
        let coords = this._coordsToItems(
            this.state.current,
            this.coords,
            items.length
        );

        this.items = [];

        // Create the items
        items.map((item, index) => {
            let dotSize = 10;
            let x = coords[index].x;
            let y = coords[index].y;
            let alpha = coords[index].alpha;
            let { title } = item.node.frontmatter;

            this.items[index] = new PIXI.Container();

            this.items[index].x = x;
            this.items[index].y = y;

            // Create the title
            let style = new PIXI.TextStyle({
                fontFamily: font,
                fontSize: 16,
                fontWeight: "bold",
                fill: "#ffffff",
                wordWrap: true,
                wordWrapWidth: 200,
                align: "center"
            });

            title = new PIXI.Text(title.toUpperCase(), style);

            title.x = 0 - title.width / 2;
            title.y = 0 - title.height - 50;

            this.items[index].addChild(title);

            // Create the dot
            let graphics = new PIXI.Graphics();

            graphics
                .beginFill(0xffffff)
                .drawCircle(0, 0, dotSize)
                .endFill();

            graphics.lineStyle(1, 0xffffff, 0.2).drawCircle(0, 0, dotSize + 5);

            graphics
                .moveTo(0, 0)
                .lineStyle(1, 0xffffff)
                .lineTo(0, 0 - 40);

            // add dot to this.items[index]
            this.items[index].addChild(graphics);

            // make clickable
            // Opt-in to interactivity
            this.items[index].interactive = true;

            // Shows hand cursor
            this.items[index].buttonMode = true;

            // Pointers normalize touch and mouse
            this.items[index].on("pointerdown", () => this.handleClick(index));

            this.items[index].alpha = alpha;

            group.addChild(this.items[index]);
        });

        return group;
    }

    _circle() {
        let graphics = new PIXI.Graphics();

        graphics
            .beginFill(0xffffff)
            .drawEllipse(
                this.width / 2,
                this.height + this.curveStop,
                this.width,
                this.curveStart + this.curveStop
            )
            .endFill();

        return graphics;
    }

    _gradient() {
        let margin = 100;
        let height = this.curveStart + 100;
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        let gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, colors.background);
        gradient.addColorStop(1, colors.accent);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        var sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
        sprite.y = this.height - height;

        return sprite;
    }

    _coordsToItems(current, coords) {
        let toShow = 2;

        // Move coords according to position
        if (current != 0) {
            coords = coords
                .slice(-current) // remove from back
                .concat(coords.slice(0, coords.length - current)); // add to front
        }

        return coords;
    }

    _coords(places, length) {
        let items = [];
        let perSide = length / 2;
        let toShow = 3;

        for (var i = 0; i < places; i++) {
            let current = new Object();
            let theta = Math.PI * 2 / places;
            let angle = theta * i + -Math.PI / 2;
            let x = this.width / 2 + this.width * Math.cos(angle); // center point + radius * angle
            let y =
                this.height +
                (this.curveStop + this.curveStart) * Math.sin(angle) +
                this.curveStop;
            let alpha = i < toShow || i > places - toShow ? 1 : 0;

            current.x = x;
            current.y = y;
            current.alpha = alpha;

            items[i] = current;
        }

        // Remove unused coords
        let coords = items
            .slice(0, perSide)
            .concat(items.slice(items.length - perSide));

        return coords;
    }

    handleClick(x) {
        this.setCurrent(x);
    }

    setCurrent(x) {
        let coords = this._coordsToItems(x, this.coords, this.items.length);

        // Set state
        this.setState({ current: x });

        // Move the items along the oval
        this.items.map((item, index) => {
            TweenLite.to(item, 0.5, {
                x: coords[index].x,
                y: coords[index].y,
                alpha: coords[index].alpha
            });
        });
    }

    render() {
        let { services } = this.props;
        let { current } = this.state;

        return (
            <SectionContainer>
                <Row>
                    <Column medium={4}>
                        <HeaderBlock textAlign="left">
                            <span>Together</span>
                            <br />
                            We can Achieve More
                        </HeaderBlock>
                    </Column>
                </Row>

                <Container>
                    <Canvas
                        innerRef={input => {
                            this.canvas = input;
                        }}
                    />

                    <ServiceSummary service={services[current].node} />
                </Container>
            </SectionContainer>
        );
    }
}

export default ServicesSection;
