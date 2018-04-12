import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";

import { colors, spacing } from "../../theme/theme";

const Image = styled.section`
    min-height: 200px;
    max-height: 500px;
    height: 30vw;
    position: relative;
    background-image: url('${props => props.backgroundImage}');
    background-size: cover;
    background-position: center;
    text-align: center;
`;

const WorkSummary = ({ work }) => {
    return <Image backgroundImage={work.frontmatter.thumb} />;
};

export default WorkSummary;
