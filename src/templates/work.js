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
import { transparentize, isBrowser } from "../helpers/helpers";

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
    padding: 4.5rem 3rem 4em;
`;

const Img = styled.div`
    width: 100vw;
    height: 60vw;
    min-height: 600px;
    max-height: 1000px;
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
            title,
            footer
        } = data.work.frontmatter;

        const solutions = data.solutions.edges;

        const parallaxStyle = {
            height: "50vw",
            maxHeight: 1000,
            minHeight: 500,
            overflow: "hidden",
            marginBottom: 0
        };

        return [
            <PageDetailContainer
                padding={0}
                style={{
                    paddingBottom: 0,
                    textAlign: "center",
                    ...(transition && transition.style)
                }}>
                {helmet || ""}
                {hero && (
                    <Hero
                        src={getOriginalImageSrc(hero)}
                        style={{ maxHeight: 500, marginBottom: "4rem" }}
                    />
                )}

                <Row>
                    <Column xlarge={7} centered>
                        <PullQuote fontSize={3} padding={3}>
                            <Content content={intro}>{intro}</Content>
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
                                            xlarge={!section.stacked ? 6 : 7}
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
                                        {section.video && isBrowser() ? (
                                            <Video src={section.video} />
                                        ) : (
                                            section.image &&
                                            (section.parallax ? (
                                                <Parallax strength={200}>
                                                    <div
                                                        style={parallaxStyle}
                                                    />
                                                    <Background className="custom-bg">
                                                        <Img
                                                            src={getOriginalImageSrc(
                                                                section.image
                                                            )}
                                                        />
                                                    </Background>
                                                </Parallax>
                                            ) : (
                                                <img
                                                    src={getOriginalImageSrc(
                                                        section.image
                                                    )}
                                                />
                                            ))
                                        )}
                                    </Column>
                                </Row>
                            </div>
                        );
                    })}

                <Row>
                    <Column style={{ textAlign: "center" }}>
                        <Container>
                            <div style={{ height: 12 }} />

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
                {footer ? (
                    <Row expanded collapse>
                        <Column collapse>
                            <Hero
                                style={{ ...parallaxStyle, marginBottom: 0 }}
                                src={getOriginalImageSrc(footer)}
                            />
                        </Column>
                    </Row>
                ) : (
                    <div style={{ height: 80 }} />
                )}
            </PageDetailContainer>
        ];
    }
}

export default ({ history, transition, data }) => {
    const { title, metaTitle, metaDescription } = data.work.frontmatter;
    const pageTitle =
        metaTitle ||
        `${title} | News | RLA Group | Full Service Advertising Agency`;
    return (
        <WorkTemplate
            helmet={
                <Helmet title={pageTitle}>
                    <meta name="title" content={pageTitle} />
                    {metaDescription && (
                        <meta name="description" content={metaDescription} />
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
            width: "100%",
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
                <video {...videoOptions}>
                    <source src={src} />
                </video>
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
                footer
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
                    imageAlignment
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
