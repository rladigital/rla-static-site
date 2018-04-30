import React from "react";
import styled, { css } from "styled-components";
import { Row, Column, Button, Modal } from "rla-components";
import Carousel from "nuka-carousel";
import FAIcon from "@fortawesome/react-fontawesome";

import { isMobile, isBrowser } from "../helpers/helpers";
import { colors, spacing, breakpoints } from "../theme/theme";
import Icon from "./blog/Icon";

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

const CarouselItem = styled.div`
    position: relative;
    width: 100%;
    height: 640px;
    text-align: center;
    img {
        position: relative;
        transform: translateY(-50%);
        top: 50%;
        margin: auto;
    }
`;

const Control = styled.a`
    top: 75%;
    font-size: 3em;
    color: ${colors.white};
    cursor: pointer;
    position: absolute;
    padding: ${spacing.padding}em 0;
    //text-shadow: 5px 5px 5px #000;
    filter: drop-shadow(0 0 1px #777);
    transform: translateY(-50px);
    ${props =>
        props.right &&
        css`
            right: -70px;
            @media (min-width: ${breakpoints.xlarge}px) {
                right: 0;
            }
        `} ${props =>
        props.left &&
        css`
            left: -70px;
            @media (min-width: ${breakpoints.xlarge}px) {
                left: 0;
            }
        `};
`;

export class GalleryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
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
                    this.props.images.length - 1
                )
            );
        }
    }
    render() {
        const settings = {
            slideWidth: 1,
            cellAlign: "center",
            dots: false,
            slideIndex: this.state.currentSlide,
            renderCenterRightControls: ({ nextSlide }) => (
                <Control className="fa-layers fa-fw" onClick={nextSlide} left>
                    <Icon
                        size={40}
                        icon="chevron-right"
                        transform="shrink-10"
                        iconColor={colors.white}
                    />
                </Control>
            ),
            renderCenterLeftControls: ({ previousSlide }) => (
                <Control
                    className="fa-layers fa-fw"
                    onClick={previousSlide}
                    right
                >
                    <Icon
                        size={40}
                        icon="chevron-left"
                        transform="shrink-10"
                        iconColor={colors.white}
                    />
                </Control>
            ),
            renderBottomCenterControls: ({ currentSlide }) => null,
            afterSlide: slideIndex => {
                this.setSlide(slideIndex);
            }
        };

        const { images, selectedImageIndex } = this.props;
        //console.log(selectedImageIndex, this.state.currentSlide);
        return (
            <Modal
                onClose={this.props.showModal.bind(this, false)}
                visible={this.props.modalVisible}
            >
                <Carousel {...settings} style={{ minHeight: "400px" }}>
                    {images.map((image, index) => {
                        return (
                            <CarouselItem
                                key={index}
                                onClick={() => this.setSlide(index)}
                            >
                                <img src={image} />
                            </CarouselItem>
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
