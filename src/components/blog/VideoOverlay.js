import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import styled from "styled-components";
import Transition from "react-transition-group/Transition";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    padding: 50px;
    z-index: 999;
`;

const CloseButton = styled.button`
    top: 0;
    right: 0;
    border: none;
    font-size: 2.5em;
    line-height: 0;
    padding: 0;
    margin: 30px 15px;
    position: absolute;
    background: transparent;
    color: rgba(225, 225, 225, 0.5);
    cursor: pointer;
`;

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
};

const Fade = ({ visible, children }) => (
    <Transition in={visible} timeout={duration} unmountOnExit>
        {state => (
            <Overlay
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                {children}
            </Overlay>
        )}
    </Transition>
);

export default class VideoOverlay extends React.Component {
    render() {
        const { url, visible, handleClose } = this.props;
        return ReactDOM.createPortal(
            <Fade visible={visible}>
                <CloseButton onClick={handleClose}>&times;</CloseButton>
                <ReactPlayer width="100%" height="100%" url={url} playing />
            </Fade>,
            document.getElementById("modal-root")
        );
    }
}
