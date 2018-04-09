import React from "react";
import styled from "styled-components";
import { Row, Column } from "rla-components";
import { colors } from "../../theme/theme";
import video from "../../videos/video.mp4";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${colors.background};
`;

const Svg = styled.svg`
    position: absolute;
`;

const Video = styled.video`
    width: 95%;
    height: 95%;
    position: absolute;
    margin: 2.5% 0 0 2.5%;
`;

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Rect = styled.rect`
    width: 100%;
    height: 100%;
`;

class SolutionsVideo extends React.Component {
    componentDidMount() {
        this.video.addEventListener("progress", () => {
            if (this.video && this.video.readyState > 1) {
                let loadedPercentage =
                    this.video.buffered.end(0) / this.video.duration * 100;
                console.log("test", loadedPercentage);
                progress.value = loadedPercentage;
            }
        });
    }

    render() {
        const { width, height, scrollY, style } = this.props;

        const circleProps = {
            cx: width / 2,
            cy: height / 2,
            r: Math.max(
                (1 - scrollY / height) *
                    (Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2),
                0
            ),
            fill: colors.white
        };

        const scale = Math.max(1 - scrollY / height, 0);

        return (
            <Container style={{ ...style, opacity: scale }}>
                <Svg width={width} height={height}>
                    <circle {...circleProps} />
                </Svg>

                <VideoContainer
                    style={{
                        transform: `scale(${scale})`
                    }}
                >
                    <Video
                        autoPlay
                        muted
                        loop
                        innerRef={video => {
                            this.video = video;
                        }}
                    >
                        <source src={video} type="video/mp4" />
                    </Video>
                    <Svg width={width} height={height} viewBox="0 0 1920 1080">
                        <defs>
                            <mask id="mask" x="0" y="0">
                                <Rect
                                    x="0"
                                    y="0"
                                    fill="#ffffff"
                                    width="100%"
                                    height="100%"
                                />
                                <path
                                    d="M1293.46,283.45,1081.55,808.38V698.66H893.31V287.75H700.76V449.11c-6.45-38.72-23.66-69.92-49.48-95.74-39.8-39.8-105.42-65.62-206.53-65.62H164V862.16H356.55V697.59h40.88L506.06,862.16h749.75l29-77.45H1486l30.12,77.45h209.76l-242-578.71ZM513.59,505c0,35.5-28,55.94-74.22,55.94H356.55V449.11h83.9c44.1,0,73.15,18.29,73.15,54.86ZM591,666.39c59.16-28,99-74.22,109.72-138.76v299Zm743.29-17.21L1387,509.34l52.71,139.84Zm328.08-431.35A93.58,93.58,0,1,0,1756,311.42,93.65,93.65,0,0,0,1662.42,217.84Zm0,176.41a82.83,82.83,0,1,1,82.83-82.83C1746.32,356.6,1708.67,394.25,1662.42,394.25Zm63.46-86.05v35.5h-14V310.34c0-8.61-2.15-11.83-7.53-11.83-7.53,0-11.83,6.45-12.91,11.83,0,2.15-1.08,4.3-1.08,6.45v25.82h-14V310.34c0-7.53-1.08-11.83-7.53-11.83-7.53,0-11.83,6.45-14,12.91v32.27h-14v-39.8c0-5.38-2.15-5.38-3.23-5.38h0V286.68h1.08c7.53,0,12.91,1.08,15.06,6.45,4.3-4.3,10.76-7.53,17.21-7.53q12.91,0,16.14,9.68c3.23-5.38,9.68-9.68,18.29-9.68C1719.43,285.6,1725.88,293.13,1725.88,308.19Zm-93.58,22.59h2.15v12.91h-4.3c-6.45,0-21.51-2.15-21.51-21.51V298.51h-7.53V286.68h7.53V271.62h12.91v15.06h12.91v11.83h-12.91V321.1c0,6.45,3.23,10.76,9.68,10.76C1631.22,330.78,1631.22,330.78,1632.3,330.78Z"
                                    fill="#000000"
                                />
                            </mask>
                        </defs>
                        <Rect
                            x="0"
                            y="0"
                            mask="url(#mask)"
                            fill={colors.white}
                            width="100%"
                            height="100%"
                        />
                    </Svg>
                </VideoContainer>
            </Container>
        );
    }
}

export default SolutionsVideo;
