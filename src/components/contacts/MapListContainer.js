import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../theme/theme";

export const Container = styled.div`
    width: 200px;
    height: 300px;
    position: absolute;
    z-index: 2;
    background: ${colors.mediumBlueGray};
`;

class MapListContainer extends React.Component {
    render() {
        const { contacts, onItemClick } = this.props;
        return (
            <Container>
                {this.props.children.map((child, index) => {
                    return React.cloneElement(child, { contacts, onItemClick });
                })}
            </Container>
        );
    }
}

export default MapListContainer;
