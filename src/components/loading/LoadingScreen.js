import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const Overlay = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: #ffffff;
    z-index: 9999;
`;

const Centred = styled.div`
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
`;

const LoadingScreen = props => (
    <Overlay id="loadingxx">
        <Centred>
            <Loader {...props} />
        </Centred>
    </Overlay>
);

export default LoadingScreen;
