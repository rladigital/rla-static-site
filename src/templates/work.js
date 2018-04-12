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
import HeaderBlock from "../components/HeaderBlock";
import BackButton from "../components/blog/BackButton";
import Hero from "../components/blog/Hero";

const Logo = styled.img`
    height: 70px;
    margin-bottom: 3em;
`;

const Heading = styled.h4`
    margin-bottom 1.2em;
    @media (min-width: ${breakpoints.medium}px) {
        font-size: ${props => props.fontSize}em;
    }
`;

const GalleryItem = styled.div`
    width: 100%;
    height: 80vw;
    margin: 0 0 8vw 0;
    float: left;
    position: relative;
    @media (min-width: ${breakpoints.medium}px) {
        width: 18vw;
        height: 18vw;
        max-width: 340px;
        max-height: 340px;
        margin: 0 2.4vw 2.4vw 0;
    }
`;

const GalleryImage = GalleryItem.extend`
    background-image: url('${props => props.src}');
    background-size: cover;
    background-position: center;
`;

const StyledButton = Button.extend`
    top: 50%;
    left: 50%;
    width: 80%;
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    font-weight 900;
`;

const Table = styled.table`
    margin: 0 0 5em 0;
    display: inline-block;
`;

const Td = styled.td`
    padding: 0 2em 1em 0;
`;

const Solution = styled.p`
    color: ${colors.lightGray};
`;

const contentStyle = {
    marginBottom: "4em",
    color: colors.lightGray
};

export const WorkTemplate = ({
    content,
    logo,
    hero,
    project,
    outcome,
    galleryImages,
    solutionsList,
    title,
    intro,
    helmet
}) => {
    return (
        <PageDetailContainer>
            {helmet || ""}
            <BackButton to="/work" />
            {hero && (
                <Row>
                    <Column>
                        <Hero src={hero} />{" "}
                    </Column>
                </Row>
            )}
            {logo && (
                <Row>
                    <Column>
                        <Logo src={logo} id="logo" />
                    </Column>
                </Row>
            )}
            <Row>
                <Column large={6}>
                    <PullQuote fontSize={4}>{intro} </PullQuote>
                </Column>
                <Column large={6}>
                    <Heading>The Project</Heading>
                    <Content content={project} style={contentStyle} />
                    <Heading>The Outcome</Heading>
                    <Content content={outcome} style={contentStyle} />

                    <Table>
                        <tbody>
                            <tr>
                                <Td>
                                    <Heading fontSize={1}>
                                        Our areas of expertise —{" "}
                                    </Heading>
                                </Td>
                                <Td>
                                    {solutionsList.map((solution, index) => {
                                        return (
                                            <Solution key={index}>
                                                {solution}
                                            </Solution>
                                        );
                                    })}
                                </Td>
                            </tr>
                        </tbody>
                    </Table>
                </Column>
            </Row>
            <Row>
                <Column>
                    {galleryImages.map((image, index) => {
                        return <GalleryImage key={index} src={image} />;
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
                </Column>
            </Row>
        </PageDetailContainer>
    );
};

export default ({ data }) => {
    //console.log(data);
    const { markdownRemark: work } = data;
    return (
        <WorkTemplate
            description={work.frontmatter.description}
            helmet={<Helmet title={`Our Work | ${work.frontmatter.title}`} />}
            title={work.frontmatter.title}
            logo={work.frontmatter.logo}
            hero={work.frontmatter.hero}
            project={work.frontmatter.project}
            outcome={work.frontmatter.outcome}
            galleryImages={work.frontmatter.galleryImages}
            solutionsList={work.frontmatter.solutionsList}
            intro={work.frontmatter.intro}
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
                logo
                hero
                project
                outcome
                galleryImages
                solutionsList
            }
        }
    }
`;
