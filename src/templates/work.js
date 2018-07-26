import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button, Modal } from "rla-components";
import Link from "gatsby-link";
import { Parallax, Background } from "react-parallax";

import { getOriginalImageSrc } from "../utils/image";
import { colors, spacing, breakpoints } from "../theme/theme";
import { transparentize } from "../helpers/helpers";

import Content, { HTMLContent } from "../components/Content";
import PageDetailContainer from "../components/PageDetailContainer";
import PullQuote from "../components/PullQuote";
import GalleryImage, {
    GalleryItem,
    GalleryModal
} from "../components/GalleryImage";
import HeaderBlock from "../components/HeaderBlock";
import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";

const Logo = styled.img`
    max-height: 70px;
    margin-bottom: -2em;
`;

const StyledButton = Button.extend`
    top: 50%;
    left: 50%;
    width: 80%;
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-weight: 600;
`;

const Table = styled.table`
    margin: 0 0 5em 0;
    display: inline-block;
`;

const Td = styled.td`
    padding: 0 2em 1em 0;
`;

const Solution = styled.div`
    padding: 0 30px;
    margin-bottom: 1.2rem;
    display: inline-block;
`;

const SolutionDot = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: red;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
`;

const H2 = styled.h2`
    font-size: 1.2em;
    padding-top: 4.5em;
`;

const StyledContent = styled(Content)`
    padding-bottom: 4em;
`;

const Img = styled.div`
    width: 100vw;
    height: 35vw;
    min-height: 600px;
    max-height: 800px;
    background-image: url('${props => props.src}');
    background-position: center;
    background-size: cover;
`;

const Video = styled.button.attrs({ role: "play " })`
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    position: absolute;
    background-image: url("/img/play.svg");
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px 4px ${transparentize(colors.accent, 0.5)};
    }
`;

export class WorkTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            selectedImageIndex: 0
        };
    }

    setModalVisibility(visibility, selectedImageIndex = 0) {
        // console.log(
        //     "visibility",
        //     visibility,
        //     "selectedImageIndex",
        //     selectedImageIndex
        // );
        this.setState({
            modalVisible: visibility,
            selectedImageIndex: selectedImageIndex
        });
    }
    render() {
        const { data, helmet, transition, history } = this.props;

        const {
            copySections,
            hero,
            intro,
            logo,
            solutionsList,
            title
        } = data.work.frontmatter;

        const solutions = data.solutions.edges;

        const parallaxStyle = {
            height: "35vw",
            maxHeight: 800,
            minHeight: 300
        };

        return (
            <PageDetailContainer
                padding={0}
                style={{ textAlign: "center", ...transition.style }}>
                {helmet || ""}
                {hero && <Hero src={getOriginalImageSrc(hero)} />}

                <Row>
                    <Column large={7} centered>
                        <PullQuote fontSize={3} padding={2}>
                            {intro}
                        </PullQuote>

                        {logo && (
                            <Logo src={getOriginalImageSrc(logo)} id="logo" />
                        )}
                    </Column>
                </Row>

                {copySections &&
                    copySections.map(section => (
                        <div>
                            <Row>
                                <Column large={7} centered>
                                    {section.title && <H2>{section.title}</H2>}
                                    {section.description && (
                                        <StyledContent
                                            content={section.description}
                                        />
                                    )}
                                </Column>
                            </Row>
                            {section.parallax ? (
                                <Parallax strength={200}>
                                    <div style={parallaxStyle} />
                                    <Background className="custom-bg">
                                        <Img
                                            src={getOriginalImageSrc(
                                                section.image
                                            )}
                                        />
                                    </Background>
                                    {section.video && <Video />}
                                </Parallax>
                            ) : (
                                <Hero
                                    style={parallaxStyle}
                                    src={getOriginalImageSrc(section.image)}>
                                    {section.video && <Video />}
                                </Hero>
                            )}
                        </div>
                    ))}

                <Row>
                    <Column style={{ textAlign: "center" }}>
                        <H2>Areas of expertise</H2>

                        {solutionsList &&
                            solutionsList.map((solution, index) => {
                                const colors = solutions.filter(
                                    item =>
                                        item.node.frontmatter.title === solution
                                );

                                return (
                                    <Solution key={index}>
                                        {colors.length && (
                                            <SolutionDot
                                                style={{
                                                    background: `linear-gradient(to bottom, ${
                                                        colors[0].node
                                                            .frontmatter.color1
                                                    }, ${
                                                        colors[0].node
                                                            .frontmatter.color2
                                                    })`
                                                }}
                                            />
                                        )}

                                        <span>{solution}</span>
                                    </Solution>
                                );
                            })}
                        <div style={{ height: 100 }} />
                    </Column>
                </Row>
            </PageDetailContainer>
        );
    }
}

export default ({ history, transition, data }) => {
    return (
        <WorkTemplate
            helmet={
                <Helmet title={`Our Work | ${data.work.frontmatter.title}`} />
            }
            data={data}
            transition={transition}
            history={history}
        />
    );
};

export const pageQuery = graphql`
    query WorkByPath($path: String!) {
        work: markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                hero {
                    responsive {
                        childImageSharp {
                            original {
                                src
                            }
                        }
                    }
                    original
                }
                title
                intro
                logo {
                    responsive {
                        childImageSharp {
                            original {
                                src
                            }
                        }
                    }
                    original
                }
                copySections {
                    title
                    description
                    image
                    parallax
                    video
                }
                solutionsList
            }
        }
        solutions: allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "solutions" } } }
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        color1
                        color2
                    }
                }
            }
        }
    }
`;
