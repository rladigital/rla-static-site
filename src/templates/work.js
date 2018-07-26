import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";

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
    margin-bottom: 3rem;
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

const WorkContent = styled.div`
    text-align: center;
    h1 {
        font-weight: 700;
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
        const {
            content,
            logo,
            hero,
            description,
            galleryImages,
            solutionsList,
            title,
            intro,
            helmet,
            transition,
            history
        } = this.props;

        return (
            <PageDetailContainer style={transition && transition.style}>
                {helmet || ""}
                {history && <BackButton goBack={history.goBack} />}
                {hero && (
                    <Row>
                        <Column>
                            <Hero src={getOriginalImageSrc(hero)} />{" "}
                        </Column>
                    </Row>
                )}

                <Row>
                    <Column large={7} centered>
                        <WorkContent>
                            <PullQuote fontSize={3} padding={2}>
                                {intro}
                            </PullQuote>

                            {logo && (
                                <Logo
                                    src={getOriginalImageSrc(logo)}
                                    id="logo"
                                />
                            )}

                            <Content
                                content={description}
                                className="cms-content"
                            />
                        </WorkContent>
                    </Column>
                </Row>
                <Row>
                    <Column style={{ textAlign: "center" }}>
                        <h6>Our areas of expertise</h6>

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
            description={work.frontmatter.description}
            helmet={<Helmet title={`Our Work | ${work.frontmatter.title}`} />}
            title={work.frontmatter.title}
            logo={work.frontmatter.logo}
            hero={work.frontmatter.hero}
            description={work.frontmatter.description}
            galleryImages={work.frontmatter.galleryImages}
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
                description
                galleryImages
                solutionsList
            }
        }
    }
`;
