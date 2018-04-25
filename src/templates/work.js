import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import graphql from "graphql";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Row, Column, Button } from "rla-components";
import Link from "gatsby-link";

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
    margin-bottom: 1.2rem;
`;
const WorkContent = styled.div`
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
                            <Hero
                                src={
                                    hero.childImageSharp &&
                                    hero.childImageSharp.original.src
                                }
                            />{" "}
                        </Column>
                    </Row>
                )}
                {logo && (
                    <Row>
                        <Column>
                            <Logo
                                src={
                                    logo.childImageSharp &&
                                    logo.childImageSharp.original.src
                                }
                                id="logo"
                            />
                        </Column>
                    </Row>
                )}
                <Row>
                    <WorkContent>
                        <Column large={6}>
                            <PullQuote fontSize={3} padding={2}>
                                {intro}
                            </PullQuote>
                        </Column>
                        <Column large={6}>
                            <Content
                                content={description}
                                className="cms-content"
                            />

                            <Table className="cms-content">
                                <tbody>
                                    <tr>
                                        <Td>
                                            <h1>Our areas of expertise</h1>
                                        </Td>
                                        <Td>
                                            {solutionsList &&
                                                solutionsList.map(
                                                    (solution, index) => {
                                                        return (
                                                            <Solution
                                                                key={index}
                                                            >
                                                                {solution}
                                                            </Solution>
                                                        );
                                                    }
                                                )}
                                        </Td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Column>
                    </WorkContent>
                </Row>
                <Row>
                    <Column>
                        {galleryImages &&
                            galleryImages.map((image, index) => {
                                return (
                                    <GalleryImage
                                        key={index}
                                        index={index}
                                        src={image}
                                        showModal={this.setModalVisibility.bind(
                                            this
                                        )}
                                    />
                                );
                            })}

                        <GalleryItem>
                            <Link to="/work">
                                <StyledButton
                                    size="large"
                                    color="background"
                                    borderWidth={3}
                                    hollow
                                >
                                    SEE MORE WORK →
                                </StyledButton>
                            </Link>
                        </GalleryItem>
                        {galleryImages && (
                            <GalleryModal
                                images={galleryImages}
                                showModal={this.setModalVisibility.bind(this)}
                                modalVisible={this.state.modalVisible}
                                selectedImageIndex={
                                    this.state.selectedImageIndex
                                }
                            />
                        )}
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
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
                hero {
                    childImageSharp {
                        original {
                            src
                        }
                    }
                }
                description
                galleryImages
                solutionsList
            }
        }
    }
`;
