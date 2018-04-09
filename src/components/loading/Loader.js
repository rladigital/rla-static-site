import React from "react";
import styled, { keyframes } from "styled-components";

const pathProps = {
    d:
        "M107,0L86.9,49.8V39.3H69.1V0.4H50.9v15.3c-0.6-3.7-2.2-6.6-4.7-9.1c-3.8-3.8-10-6.2-19.6-6.2H0v54.4h18.2V39.3h3.9	l10.3,15.6H51l0,0h33.9h2h16.5l2.8-7.3h19.2l2.9,7.3H148L125.1,0H107z M33,21c0,3.4-2.7,5.3-7,5.3h-7.8V15.7h8 c4.2,0,6.9,1.7,6.9,5.2V21z M40.5,36.4c5.6-2.7,9.4-7,10.4-13.1v28.3L40.5,36.4z M110.9,34.7l5-13.3l5,13.3H110.9z",
    transform: "translate(0 1)",
    fill: "#ffffff"
};

const Svg = styled.svg`
    max-width: 100%;
`;

const animation = keyframes`
    from {opacity: 1;}
    to {opacity: 0.2;}
`;

const Loader = ({ percentage, text }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 90" width="200">
        <defs>
            <mask id="loader_mask">
                <path {...pathProps} />
            </mask>
        </defs>
        <path {...pathProps} stroke="#eeeeee" strokeWidth={1} />
        <rect
            style={{
                animation: percentage
                    ? "none"
                    : `${animation} ${1}s infinite alternate`,
                transition: `width ${1}s ease`
            }}
            width={`${percentage}%` || "100%"}
            height={60}
            mask="url(#loader_mask)"
            fill="#dddddd"
        />
        <text x={74} y={80} textAnchor="middle" fill="#dddddd">
            {text}
        </text>
    </Svg>
);

export default Loader;
