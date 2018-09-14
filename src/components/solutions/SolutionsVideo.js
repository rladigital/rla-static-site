import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Column } from "rla-components";

import { colors } from "../../theme/theme";
import placeholder from "../../img/static-video.png";
import LoadingScreen from "../loading/LoadingScreen";
import { transformScale, isMobile } from "../../helpers/helpers";
import SiteHeader from "../SiteHeader";
import ScrollDown from "./ScrollDown";

const Svg = styled.svg`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`;

const Video = styled.video`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const Img = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url('${props => props.src}');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
`;

const Background = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: ${colors.background};
`;

class SolutionsVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedPercentage: 0
        };
    }

    handleVideoLoad() {
        if (this.video && this.video.readyState > 0) {
            this.setState({
                loadedPercentage:
                    this.video.buffered.end(0) / this.video.duration * 100
            });
        }
    }

    scrollDown() {
        document.documentElement.scrollTop = this.props.height;
    }

    render() {
        const { loadedPercentage } = this.state;
        const { width, height, scrollY, style, transitionState } = this.props;

        const size = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

        const logoScale = transformScale(1500);

        return (
            <div>
                {transitionState == "entered" && <SiteHeader />}
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}>
                    <defs>
                        <mask id="mask" x="0" y="0">
                            <g transform={`translate(${size / 2} ${size / 2})`}>
                                <circle
                                    cx="0"
                                    cy="0"
                                    r={size / 2}
                                    style={{ fill: "#ffffff" }}
                                />

                                <path
                                    d="M293.24-226.06,106.9,236.5V139.06H-58.66V-222.28H-228v141.9a151,151,0,0,0-43.62-84.2c-35-35-92.71-57.71-181.61-57.71H-700v505.1h169.32V139.06h36l95.54,144.73H260.15l25.45-68.18H463.43L490,283.79H673.51L460.71-226.06ZM-393.51-31.21C-393.51,0-418.1,18-458.78,18h-72.8V-80.4h73.78c38.78,0,64.4,16.07,64.4,48.24Zm69,142.8c52-24.56,87-65.24,96.49-122v263ZM329.2,95.52,375.54-27.43l46.34,123Z"
                                    style={{ fill: "#000000" }}
                                    transform={`scale(${logoScale})`}
                                />
                            </g>
                        </mask>
                    </defs>
                    <g>
                        <rect
                            width={size}
                            height={size}
                            style={{ fill: colors.white }}
                            mask="url(#mask)"
                        />
                    </g>
                </Svg>
                {transitionState == "entered" && (
                    <ScrollDown
                        color={colors.background}
                        onClick={this.props.scrollDown}
                    />
                )}

                <Background />

                <Video
                    autoPlay
                    muted
                    loop
                    playsInline
                    innerRef={video => {
                        this.video = video;
                    }}
                    preload="auto"
                    poster={placeholder}>
                    <source
                        src="https://s3.eu-west-2.amazonaws.com/rla-website/video.mp4"
                        type="video/mp4"
                    />
                </Video>
            </div>
        );
    }
}

export default SolutionsVideo;
