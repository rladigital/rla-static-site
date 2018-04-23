import React from "react";
import styled from "styled-components";
import { colors, sizes } from "../../theme/theme";

const Container = styled.div``;

class MapListContainer extends React.Component {
    render() {
        return (
            <Container>
                {this.props.children.map((child, index) => {
                    return React.cloneElement(child, {
                        ...this.props,
                        key: index
                    });
                })}
            </Container>
        );
    }
}

export default MapListContainer;
