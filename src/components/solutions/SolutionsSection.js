import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { StickyContainer, Sticky } from "react-sticky";
import * as PIXI from "pixi.js";

import { colors } from "../../theme/theme";
import { hexToInt } from "../../helpers/helpers";

import HeaderBlock from "../HeaderBlock";
import SolutionsList from "./SolutionsList";
import SectionContainer from "../SectionContainer";

import Video from "./SolutionsVideo";

let Canvas = styled.div`
    width: 100%;
    height: 100%;
`;

let logo = new DOMParser().parseFromString(
    `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 150.8 66.4" style="enable-background:new 0 0 150.8 66.4;" xml:space="preserve">
<path fill="#ffffff" class="st0" d="M107.8,6.1L88.1,54.9V44.7H70.6V6.5H52.7v15c-0.6-3.6-2.2-6.5-4.6-8.9c-3.7-3.7-9.8-6.1-19.2-6.1H2.8v53.4h17.9
V44.6h3.8l10.1,15.3h18.2v0h33.3h2h16.2l2.7-7.2h18.7l2.8,7.2H148L125.5,6.1H107.8z M35.3,26.7c0,3.3-2.6,5.2-6.9,5.2h-7.7V21.5h7.8
c4.1,0,6.8,1.7,6.8,5.1V26.7z M42.5,41.7c5.5-2.6,9.2-6.9,10.2-12.9v27.8L42.5,41.7z M111.6,40.1l4.9-13l4.9,13H111.6z M142.1,0
c-4.8,0-8.7,3.9-8.7,8.7s3.9,8.7,8.7,8.7c4.8,0,8.7-3.9,8.7-8.7S146.9,0,142.1,0z M142.1,16.4c-4.3,0-7.7-3.5-7.7-7.7
c0-4.3,3.5-7.7,7.7-7.7c4.3,0,7.7,3.5,7.7,7.7C149.9,12.9,146.4,16.4,142.1,16.4z M148,8.4v3.3h-1.3V8.6c0-0.8-0.2-1.1-0.7-1.1
c-0.7,0-1.1,0.6-1.2,1.1c0,0.2-0.1,0.4-0.1,0.6v2.4h-1.3V8.6c0-0.7-0.1-1.1-0.7-1.1c-0.7,0-1.1,0.6-1.3,1.2c0,0.1,0,0.2,0,0.4v2.6
l-1.3,0V8c0-0.5-0.2-0.5-0.3-0.5h0V6.4l0,0c0,0,0.1,0,0.1,0c0.7,0,1.2,0.1,1.4,0.6c0.4-0.4,1-0.7,1.6-0.7c0.8,0,1.3,0.3,1.5,0.9
c0.3-0.5,0.9-0.9,1.7-0.9C147.4,6.3,148,7,148,8.4z M139.3,10.5l0.2,0v1.2l-0.1,0c0,0-0.2,0-0.3,0c-0.6,0-2-0.2-2-2V7.5h-0.7V6.4
h0.7V5h1.2v1.4h1.2v1.1h-1.2v2.1c0,0.6,0.3,1,0.9,1C139.2,10.5,139.2,10.5,139.3,10.5z"/>
</svg>
`,
    "image/svg+xml"
);

//#082748
class SolutionsSection extends React.Component {
    constructor() {
        super();

        this.width = document.body.clientWidth;
        this.height = document.body.clientHeight;
    }
    componentDidMount() {
        let logoPadding = 100;
        let backgroundColor = "ffffff";
        let videoURL =
            "https://s3.eu-west-2.amazonaws.com/volvofirstclass/global/public/Volvo+first+class.mp4";
        let { solutions } = this.props;

        // Create pixi app
        let app = new PIXI.Application({
            width: this.width,
            height: this.height,
            forceCanvas: true,
            backgroundColor: hexToInt(colors.background)
        });

        // The Connected Ambition Group
        this.SolutionsList = new SolutionsList(
            this.width,
            this.height,
            solutions
        );
        app.stage.addChild(this.SolutionsList.group());

        // The Video Group
        this.video = new Video(
            this.width,
            this.height,
            backgroundColor,
            logo,
            logoPadding,
            videoURL
        );
        app.stage.addChild(this.video.group());

        // Add to canvas
        this.canvas.appendChild(app.view);

        // Handle Scroll
        window.addEventListener("scroll", () => this.handleScroll());

        // Handle Mouse Move
        window.addEventListener("mousemove", e => this.handleMouseMove(e));
    }

    handleScroll() {
        this.video.resize(window.scrollY);
        this.SolutionsList.scroll(window.scrollY);
    }

    handleMouseMove(e) {
        this.SolutionsList.parallax(e);
    }

    render() {
        return (
            <StickyContainer style={{ height: this.height * 2.5 }}>
                <Sticky>
                    {({ style }) => {
                        return (
                            <Canvas
                                style={style}
                                innerRef={div => {
                                    this.canvas = div;
                                }}
                            />
                        );
                    }}
                </Sticky>
            </StickyContainer>
        );
    }
}

export default SolutionsSection;
