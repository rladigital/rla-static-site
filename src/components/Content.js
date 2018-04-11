import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";

export default ({ content, className, style }) => {
    return (
        <div className={className} style={style}>
            {
                Remark()
                    .use(ReactRenderer)
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
