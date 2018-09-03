import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button, Modal } from "rla-components";
import Link from "gatsby-link";
import { Parallax, Background } from "react-parallax";
import VideoCover from "react-video-cover";
import ScrollTrigger from "react-scroll-trigger";

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
    margin-bottom: 2.5em;
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
`;

const Container = styled.div`
    padding: 4.5rem 3rem 3em;
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

export class WorkTemplate extends React.Component {
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
            minHeight: 300,
            overflow: "hidden"
        };

        return [
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
                    copySections.map((section, index) => {
                        return (
                            <div>
                                <Row
                                    expanded
                                    collapse
                                    equaliseChildHeight={!section.stacked}>
                                    {(section.title || section.description) && (
                                        <Column
                                            large={!section.stacked ? 6 : 7}
                                            collapse
                                            centered={section.stacked}
                                            style={{ position: "relative" }}>
                                            <Container
                                                style={{
                                                    ...(!section.stacked && {
                                                        top: "50%",
                                                        position: "absolute",
                                                        transform:
                                                            "translateY(-50%)"
                                                    }),
                                                    ...(index == 0 && {
                                                        marginTop: "-1em"
                                                    })
                                                }}>
                                                {section.title && (
                                                    <H2>{section.title}</H2>
                                                )}
                                                {section.description && (
                                                    <Content
                                                        className="work-cms-content"
                                                        content={
                                                            section.description
                                                        }
                                                    />
                                                )}
                                            </Container>
                                        </Column>
                                    )}
                                    <Column
                                        large={!section.stacked ? 6 : 12}
                                        collapse>
                                        {section.video ? (
                                            <div style={parallaxStyle}>
                                                <Video src={section.video} />
                                            </div>
                                        ) : section.parallax ? (
                                            <Parallax strength={200}>
                                                <div style={parallaxStyle} />
                                                <Background className="custom-bg">
                                                    <Img
                                                        src={getOriginalImageSrc(
                                                            section.image
                                                        )}
                                                    />
                                                </Background>
                                            </Parallax>
                                        ) : (
                                            <Hero
                                                style={parallaxStyle}
                                                src={getOriginalImageSrc(
                                                    section.image
                                                )}
                                            />
                                        )}
                                    </Column>
                                </Row>
                            </div>
                        );
                    })}

                <Row>
                    <Column style={{ textAlign: "center" }}>
                        <Container>
                            <H2>Areas of expertise</H2>

                            {solutionsList &&
                                solutionsList.map((solution, index) => {
                                    const colors = solutions.filter(
                                        item =>
                                            item.node.frontmatter.title ===
                                            solution
                                    );

                                    return (
                                        <Solution key={index}>
                                            {colors.length && (
                                                <SolutionDot
                                                    style={{
                                                        background: `linear-gradient(to bottom, ${
                                                            colors[0].node
                                                                .frontmatter
                                                                .color1
                                                        }, ${
                                                            colors[0].node
                                                                .frontmatter
                                                                .color2
                                                        })`
                                                    }}
                                                />
                                            )}

                                            <span>{solution}</span>
                                        </Solution>
                                    );
                                })}
                        </Container>
                    </Column>
                </Row>
            </PageDetailContainer>
        ];
    }
}

export default ({ history, transition, data }) => {
    const { title, metaTitle, metaDescription } = data.work.frontmatter;
    return (
        <WorkTemplate
            helmet={
                <Helmet title={`Our Work | ${title}`}>
                    {metaTitle && (
                        <meta name="description" content={metaTitle} />
                    )}
                    {metaDescription && (
                        <meta name="title" content={metaDescription} />
                    )}
                </Helmet>
            }
            data={data}
            transition={transition}
            history={history}
        />
    );
};

class Video extends React.Component {
    render() {
        const { src } = this.props;
        const videoOptions = {
            src: src,
            ref: videoRef => {
                this.videoRef = videoRef;
            },
            onClick: () => {
                if (this.videoRef && this.videoRef.paused) {
                    this.videoRef.play();
                } else if (this.videoRef) {
                    this.videoRef.pause();
                }
            },
            loop: true
        };

        return (
            <ScrollTrigger
                onEnter={() => this.videoRef.play()}
                onExit={() => this.videoRef.pause()}>
                <VideoCover videoOptions={videoOptions} />
            </ScrollTrigger>
        );
    }
}

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
                metaTitle
                metaDescription
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
                    stacked
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
