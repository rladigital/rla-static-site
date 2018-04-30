import React from "react";
import styled, { keyframes } from "styled-components";
import { Row, Column } from "rla-components";

import { colors } from "../../theme/theme";
import video from "../../videos/video.mp4";
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

        const logoScale =
            1600 > window.innerWidth
                ? transformScale(1600)
                : transformScale(1200);

        return (
            <div>
                {transitionState == "entered" && <SiteHeader />}
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                >
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
                                    d="M293.24-226.06,106.9,236.5V139.06H-58.66V-222.28H-228v141.9a151,151,0,0,0-43.62-84.2c-35-35-92.71-57.71-181.61-57.71H-700V282.81h169.32V139.06h36l95.54,144.73H260.15l25.45-68.18H463.43L490,283.79H673.51L460.71-226.06ZM-393.51-31.21C-393.51,0-418.1,18-458.78,18h-72.8V-80.4h73.78c38.78,0,64.4,16.07,64.4,48.24Zm69,142.8c52-24.56,87-65.24,96.49-122v263ZM329.2,95.52,375.54-27.43l46.34,123ZM617.6-283.79a82.35,82.35,0,0,0-82.18,82.21,82.35,82.35,0,0,0,82.29,82.29A82.35,82.35,0,0,0,700-201.59a82.35,82.35,0,0,0-82.29-82.18Zm0,155.15a72.8,72.8,0,0,1-72.8-72.8,72.8,72.8,0,0,1,72.8-72.8,72.8,72.8,0,0,1,72.8,72.8c1.2,40.66-32,72.8-72.69,72.8Zm55.8-75.6V-173H661.11v-28.56c0-7.56-1.9-10.42-6.61-10.42a12.15,12.15,0,0,0-11.26,10.42c0,1.9-1,3.78-1,5.6v22.71H630v-29.15c0-6.61-1-10.42-6.61-10.42-6.61,0-10.42,5.6-12.29,11.34v28.39H598.81v-34.08c0-4.73-1.9-4.73-2.8-4.73h0v-10.42h1c6.61,0,11.34,1,13.24,5.6a22.4,22.4,0,0,1,15.15-6.61q11.34,0,14.2,8.4a18.37,18.37,0,0,1,16.07-8.4c12.21-.84,17.89,5.8,17.89,19Zm-82.29,19.85H593v11.34h-3.78c-5.6,0-18.93-1.9-18.93-18.93v-20.8H563.7V-223.2h6.61v-12.29h11.34v13.24H593v10.42H581.64V-192c0,5.6,2.8,9.46,8.4,9.46.22-1,.22-1.93,1.18-1.93Z"
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
                    innerRef={video => {
                        this.video = video;
                    }}
                    preload="auto"
                    poster={placeholder}
                >
                    <source src={video} type="video/mp4" />
                </Video>
            </div>
        );
    }
}

export default SolutionsVideo;
