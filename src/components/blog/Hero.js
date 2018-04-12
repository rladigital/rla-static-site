import styled from "styled-components";

const Hero = styled.div`
    width: 100%;
    height: 40vw;
    max-height: 450px;
    min-height: 180px;
    background-size: cover;
    background-position: center;
    background-image: url('${props => props.src}');
    margin-bottom: 2.8em;
`;

export default Hero;
