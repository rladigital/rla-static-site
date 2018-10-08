import styled from "styled-components";
import { colors } from "../../theme/theme";

const LoadMore = styled.div.attrs({
    role: "button"
})`
    width: 100%;
    padding: 30px;
    text-align: center;
    font-size: 28px;
    cursor: pointer;
    text-transform: uppercase;
    display: inline-block;
    font-weight: bold;
    color: ${colors.white};
    background: ${colors.accent};
`;

export default LoadMore;
