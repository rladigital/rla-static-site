import React from "react";
import Remark from "remark";
import ReactRenderer from "remark-react";

export default ({ content, className }) => (
    <div className={className}>
        {
            Remark()
                .use(ReactRenderer)
                .processSync(content).contents
        }
    </div>
);
export const HTMLContent = ({ content, className }) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
);
