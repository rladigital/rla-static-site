import { TweenLite, Elastic } from "gsap";
import * as PIXI from "pixi.js";

import { scale, random, hexToInt } from "../../helpers/helpers";

export default class SolutionsList {
    constructor(width, height, items) {
        this.width = width;
        this.height = height;
        this.r = scale(350);
        this.triggered = false;
        this.items = items;
    }

    _background() {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        let gradient = ctx.createRadialGradient(
            this.width / 2,
            this.height / 2,
            this.height,
            this.width / 2,
            this.height / 2,
            0
        );
        gradient.addColorStop(0, "#0e182c");
        gradient.addColorStop(1, "#2b3a59");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        var sprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
        return sprite;
    }

    _orbs(items) {
        let group = new PIXI.Container();

        this.orbs = [];

        // The Dot
        for (var i = 0; i < items.length; i++) {
            let current = items[i];
            let { title, color } = current.node.frontmatter;

            this.orbs[i] = new PIXI.Container();
            this.orbs[i].fixedX = 0;
            this.orbs[i].fixedY = 0;
            this.orbs[i].random = random(-20, 20);
            this.orbs[i].alpha = 0;

            // The orb

            let orb = new PIXI.Graphics();

            orb.beginFill(hexToInt(color));
            orb.drawCircle(0, 0, current.size);
            orb.x = current.x;
            orb.y = current.y;

            this.orbs[i].addChild(orb);

            // The text
            let alignment = current.x >= this.width / 2 ? "left" : "right";

            let style = new PIXI.TextStyle({
                fontFamily: "Montserrat",
                fontSize: 14,
                fontWeight: "bold",
                fill: "#ffffff", // gradient
                wordWrap: true,
                wordWrapWidth: 0,
                lineHeight: 14,
                align: alignment
            });

            let richText = new PIXI.Text(title.toUpperCase(), style);

            let margin = scale(20);
            let x =
                alignment == "left"
                    ? current.x + current.size + margin
                    : current.x - richText.width - current.size - margin;
            let y = current.y - richText.height / 2;

            richText.x = x;
            richText.y = y;

            this.orbs[i].addChild(richText);

            // Add to group;
            group.addChild(this.orbs[i]);
        }
        return group;
    }

    _lines(items) {
        let group = new PIXI.Container();

        this.lines = [];

        // The Line
        for (var i = 0; i < items.length; i++) {
            let current = items[i];
            this.lines[i] = new PIXI.Graphics();
            this.lines[i].alpha = 0;
            this.lines[i].fixedX = 0;
            this.lines[i].fixedY = 0;
            this.lines[i].random = random(-20, 20);

            let end = random(
                Math.max(0, i - 4),
                Math.min(items.length - 1, i + 4)
            );
            //let end = Math.min(items.length - 1, i + 1);
            //let end = Math.max(0, i - 1);

            let startX = current.x;
            let startY = current.y;

            let endX = items[end].x;
            let endY = items[end].y;

            let angleX = i > end ? endX - startX : startX - endX;
            let angleY = i > end ? startY - endY : endY - startY;

            let curve = Math.abs(i - end) * 0.2;

            let midpointX = (startX + endX) / 2 + curve * angleY;
            let midpointY = (startY + endY) / 2 + curve * angleX;

            if (current.title && items[end].title) {
                this.lines[i]
                    .lineStyle(1, 0x5b709f)
                    .moveTo(startX, startY)
                    .quadraticCurveTo(midpointX, midpointY, endX, endY);
            }

            group.addChild(this.lines[i]);
        }

        //LINE

        return group;
    }
    _title(titleText, captionText) {
        let group = new PIXI.Container();

        group.x = this.width / 2;
        group.y = this.height / 2;
        group.scale.set(0);
        group.pivot.set(this.width / 2, this.height / 2);

        // The Circle
        let circle = new PIXI.Graphics()
            .beginFill(0x344470)
            .drawCircle(this.width / 2, this.height / 2, scale(180))
            .endFill();

        group.addChild(circle);

        // The Title
        let titleStyle = new PIXI.TextStyle({
            fontFamily: "Montserrat",
            fontSize: scale(68),
            fontWeight: 900,
            fill: "#ffffff",
            dropShadow: true,
            dropShadowColor: "#000",
            dropShadowAlpha: 0.1,
            dropShadowBlur: scale(20),
            dropShadowAngle: 90,
            dropShadowDistance: 0,
            wordWrap: true,
            wordWrapWidth: scale(440),
            align: "center",
            lineHeight: scale(58),
            letterSpacing: scale(1)
        });
        let title = new PIXI.Text(titleText, titleStyle);

        title.x = this.width / 2 - title.width / 2;
        title.y = this.height / 2 - title.height / 2 - scale(20);

        group.addChild(title);

        // The Caption
        let captionStyle = new PIXI.TextStyle({
            fontFamily: "Montserrat",
            fontSize: scale(16),
            fill: "#829BE3",
            align: "center",
            lineHeight: scale(16),
            letterSpacing: scale(2),
            wordWrap: true,
            wordWrapWidth: scale(300)
        });
        let caption = new PIXI.Text(captionText, captionStyle);

        caption.x = this.width / 2 - caption.width / 2;
        caption.y = this.height / 2 - caption.height / 2 + scale(80);

        group.addChild(caption);

        return group;
    }

    _coords(items) {
        let deviation = scale(50);
        for (var i = 0; i < items.length; i++) {
            let current = items[i];
            let theta = Math.PI * 2 / items.length;
            let angle = theta * i - Math.PI / 2;
            let x = this.width / 2 + this.r * Math.cos(angle); // center point + radius * angle
            let y = this.height / 2 + this.r * Math.sin(angle);
            let size = scale(random(18, 34));

            current.x = x + random(-deviation, deviation);
            current.y = y + random(-deviation, deviation);
            current.size = size;
        }

        return items;
    }

    group() {
        let items = this.items;

        // Create the group
        let group = new PIXI.Container();

        let coords = this._coords(items);

        // Add background to group
        let background = this._background();
        group.addChild(background);

        // Add lines
        let lines = this._lines(items);
        group.addChild(lines);

        // Add orbs
        let orbs = this._orbs(coords);
        group.addChild(orbs);

        // Add title
        this.title = this._title(
            "CONNECTED AMBITION",
            "WORLD CLASS CONNECTED MARKETING SOLUTIONS "
        );
        group.addChild(this.title);

        return group;
    }

    scroll(scroll) {
        let scale = Math.max(0, 1 - scroll / this.height);
        this.triggered = scale > 0.01 ? false : true;

        if (this.triggered) {
            // Trigger title
            TweenLite.to(this.title.scale, 1.5, {
                ease: Elastic.easeOut.config(0.4),
                x: 1,
                y: 1
            });

            // Trigger orbs
            let orbsDelay = 0.6;
            this.orbs.map((orb, index) => {
                TweenLite.to(orb, 1, {
                    delay: orbsDelay,
                    alpha: 1
                });
                orbsDelay = orbsDelay + 0.05;
            });

            // Trigger lines
            let linesDelay = 0.8;
            this.lines.map((line, index) => {
                TweenLite.to(line, 1, {
                    delay: linesDelay,
                    alpha: 1
                });
                linesDelay = linesDelay + 0.08;
            });
        }
    }

    parallax(e) {
        let tiltx = (e.screenX - this.width / 2) * 0.0005;
        let tilty = (e.screenY - this.height / 2) * 0.0005;

        // Orbs parallax
        this.orbs.map((orb, index) => {
            orb.x = orb.fixedX - tiltx * orb.random;
            orb.y = orb.fixedY - tilty * orb.random;
        });

        // Orbs parallax
        this.lines.map((line, index) => {
            line.x = line.fixedX - tiltx * line.random;
            line.y = line.fixedY - tilty * line.random;
        });
    }
}
