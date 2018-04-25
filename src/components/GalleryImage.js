import React from "react";
import styled from "styled-components";
import { Row, Column, Button, Modal } from "rla-components";
import Carousel from "nuka-carousel";
import FAIcon from "@fortawesome/react-fontawesome";

import { isMobile, isBrowser } from "../helpers/helpers";
import { colors, spacing, breakpoints } from "../theme/theme";

export const GalleryItem = styled.div`
    width: 100%;
    height: 80vw;
    margin: 0 0 8vw 0;
    float: left;
    position: relative;
    @media (min-width: ${breakpoints.medium}px) {
        width: 18vw;
        height: 18vw;
        max-width: 340px;
        max-height: 340px;
        margin: 0 2.4vw 2.4vw 0;
    }
`;

const GalleryItemImage = GalleryItem.extend`
background-image: url('${props => props.src}');
background-size: cover;
background-position: center;
`;

const Control = styled.a`
    top: 50%;
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
    position: absolute;
    padding: ${spacing.padding}em 0;
    //transform: translateY(-335px);
    @media (min-width: ${breakpoints.medium}px) {
        padding: ${spacing.padding}em;
    }
`;

export class GalleryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedImageIndex !== this.props.selectedImageIndex) {
            this.setState({
                currentSlide: nextProps.selectedImageIndex
            });
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }
    componentDidUpdate() {
        setTimeout(() => {
            window.dispatchEvent(new Event("resize"));
        }, 0);
    }
    setSlide(x) {
        this.setState({ currentSlide: x });
    }
    handleKeyDown(e) {
        if (e.key == "ArrowLeft") {
            this.setSlide(Math.max(this.state.currentSlide - 1, 0));
        }
        if (e.key == "ArrowRight") {
            this.setSlide(
                Math.min(
                    this.state.currentSlide + 1,
                    this.props.data.clients.edges.length - 1
                )
            );
        }
    }

    render() {
        const settings = {
            slideWidth: isBrowser() && isMobile() ? 0.8 : 0.8,
            cellAlign: "center",
            dots: false,
            slideIndex: this.state.currentSlide,
            renderCenterRightControls: ({ nextSlide }) => (
                <Control
                    className="fa-layers fa-fw"
                    onClick={nextSlide}
                    style={{
                        right: 0
                    }}
                >
                    <FAIcon icon="chevron-right" transform="shrink-8" />
                    <FAIcon icon={["far", "circle"]} />
                </Control>
            ),
            renderCenterLeftControls: ({ previousSlide }) => (
                <Control
                    className="fa-layers fa-fw"
                    onClick={previousSlide}
                    style={{
                        left: 0
                    }}
                >
                    <FAIcon icon="chevron-left" transform="shrink-8" />
                    <FAIcon icon={["far", "circle"]} />
                </Control>
            ),
            renderBottomCenterControls: ({ currentSlide }) => null,
            afterSlide: slideIndex => {
                this.setSlide(slideIndex);
            }
        };

        const { images, selectedImageIndex } = this.props;
        console.log(selectedImageIndex, this.state.currentSlide);
        return (
            <Modal
                onClose={this.props.showModal.bind(this, false)}
                visible={this.props.modalVisible}
            >
                <Carousel {...settings} style={{ minHeight: "400px" }}>
                    {images.map((image, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => this.setSlide(index)}
                            >
                                <img src={image} />
                            </div>
                        );
                    })}
                </Carousel>
            </Modal>
        );
    }
}

class GalleryImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    setModalVisibility(visibility) {
        console.log("visibility", visibility);
        this.setState({
            modalVisible: visibility
        });
    }

    render() {
        const { src, showModal, index } = this.props;
        return (
            <div>
                <GalleryItemImage
                    src={src}
                    onClick={this.props.showModal.bind(this, true, index)}
                />
            </div>
        );
    }
}

export default GalleryImage;
