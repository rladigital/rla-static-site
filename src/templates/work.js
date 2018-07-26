import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";
import { Parallax, Background } from "react-parallax";

import { getOriginalImageSrc } from "../utils/image";
import { colors, spacing, breakpoints } from "../theme/theme";
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
    height: 70px;
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
    padding: 0 20px;
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
        const {
            content,
            logo,
            hero,
            solutionsList,
            copySections,
            title,
            intro,
            helmet,
            transition,
            history
        } = this.props;

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
                            <Parallax
                                disabled={!section.parallax}
                                bgImage={getOriginalImageSrc(section.image)}
                                bgImageAlt="the dog"
                                strength={200}
                                reverse>
                                <div
                                    style={{
                                        height: "40vw",
                                        maxHeight: 500,
                                        minHeight: 200
                                    }}
                                />
                            </Parallax>
                        </div>
                    ))}

                <Row>
                    <Column style={{ textAlign: "center" }}>
                        <H2>Our areas of expertise</H2>

                        {solutionsList &&
                            solutionsList.map((solution, index) => {
                                return (
                                    <Solution key={index}>
                                        <SolutionDot />
                                        <span>{solution}</span>
                                    </Solution>
                                );
                            })}
                    </Column>
                </Row>
            </PageDetailContainer>
        );
    }
}

export default ({ history, transition, data }) => {
    const { markdownRemark: work } = data;
    return (
        <WorkTemplate
            helmet={<Helmet title={`Our Work | ${work.frontmatter.title}`} />}
            title={work.frontmatter.title}
            logo={work.frontmatter.logo}
            hero={work.frontmatter.hero}
            copySections={work.frontmatter.copySections}
            solutionsList={work.frontmatter.solutionsList}
            intro={work.frontmatter.intro}
            transition={transition}
            history={history}
        />
    );
};

export const pageQuery = graphql`
    query WorkByPath($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
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
                }
                solutionsList
            }
        }
    }
`;
