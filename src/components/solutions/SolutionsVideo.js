import { TweenLite } from "gsap";
import * as PIXI from "pixi.js";
import SVGGraphics from "pixi-svg-graphics";

export default class Video {
    constructor(
        width,
        height,
        backgroundColor,
        svg,
        svgPadding,
        svgMaxWidth,
        videoURL
    ) {
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.svg = svg;
        this.svgPadding = svgPadding;
        this.svgMaxWidth = svgMaxWidth;
        this.videoURL = videoURL;
    }
    _circle(color) {
        let graphics = new PIXI.Graphics();
        let radius =
            Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / 2;

        // Circle Graphics
        graphics.lineStyle(0);
        graphics.beginFill(`0x${color}`);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();

        // Set the initial position
        graphics.pivot.set(0.5);
        graphics.x = this.width / 2;
        graphics.y = this.height / 2;

        // Create Sprite
        return graphics;
    }
    _video(url) {
        let video = document.createElement("video");
        video.preload = "auto";
        video.loop = true;
        video.muted = true;
        video.src = url;

        let texture = PIXI.Texture.fromVideo(video);
        let sprite = new PIXI.Sprite(texture);

        sprite.width = this.width;
        sprite.height = this.height;

        return sprite;
    }
    _logo(svg, padding) {
        let graphics = new PIXI.Graphics();
        let width = Math.min(this.width, this.svgMaxWidth) - padding;

        // Convert SVG to Graphics
        SVGGraphics.drawSVG(graphics, svg);

        // Set width & height
        graphics.height = width * (graphics.height / graphics.width);
        graphics.width = width - padding;

        // Set position on page
        graphics.x = this.width / 2 - graphics.width / 2;
        graphics.y = this.height / 2 - graphics.height / 2;

        return graphics;
    }
    group() {
        // Create video group
        this.group = new PIXI.Container();
        this.group.pivot.set(this.width / 2, this.height / 2);
        this.group.x = this.width / 2;
        this.group.y = this.height / 2;
        this.group.alpha = 1;

        // add circle to group
        this.circle = this._circle("ffffff");
        this.group.addChild(this.circle);

        // add background to group
        this.background = this._circle(this.backgroundColor);
        this.group.addChild(this.background);

        // add logo to group
        this.graphic = this._logo(this.svg, this.svgPadding);
        this.group.addChild(this.graphic);

        // add video to group
        this.video = this._video(this.videoURL);
        this.group.addChild(this.video);

        // add Masks to group
        this.video.mask = this.graphic;
        this.group.mask = this.circle;

        return this.group;
    }
    scroll(scroll) {
        let scale = Math.max(0, 1 - scroll / this.height);
        let innerScale = scale + scroll / 3000;

        // The tweens
        TweenLite.to(this.circle.scale, 0.5, { x: scale, y: scale });
        TweenLite.to(this.group.scale, 0.5, { x: innerScale, y: innerScale });
        TweenLite.to(this.group, 0.5, { alpha: scale });

        // Make invisible
        this.group.visible = scale < 0.01 ? false : true;
    }
}
