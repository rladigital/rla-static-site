import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";
import RemarkExternalLinks from "remark-external-links";
import rehypeReact from "rehype-react";
import Link from "gatsby-link";
import { Row, Column } from "rla-components";

const renderAst = new rehypeReact({
    createElement: React.createElement,
    components: {
        gatsbylink: Link,
        row: Row,
        column: Column
    }
}).Compiler;

export default ({ content, className, style }) => {
    return (
        <div className={className} style={style}>
            {
                Remark()
                    .use(ReactRenderer)
                    .use(RemarkExternalLinks, {
                        target: "_blank"
                    })
                    .processSync(content).contents
            }
        </div>
    );
};
export const HTMLContent = ({ content, className, style }) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
            style={style}
        />
    );
};
export const HTMLAstContent = ({ content, className, style }) => {
    return (
        <div className={className} style={style}>
            {renderAst(content)}
        </div>
    );
};
