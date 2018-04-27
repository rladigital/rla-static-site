import React from "react";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
    try {
        stylesStr = require(`!raw-loader!../public/styles.css`);
    } catch (e) {
        console.log(e);
    }
}

module.exports = class HTML extends React.Component {
    render() {
        let css;
        if (process.env.NODE_ENV === `production`) {
            css = (
                <style
                    id="gatsby-inlined-css"
                    dangerouslySetInnerHTML={{ __html: stylesStr }}
                />
            );
        }
        return (
            <html {...this.props.htmlAttributes}>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    {this.props.headComponents}
                    {css}
                    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.findIndex" />
                </head>
                <body {...this.props.bodyAttributes}>
                    {this.props.preBodyComponents}
                    <div id="modal-root" />
                    <div
                        key={`body`}
                        id="___gatsby"
                        style={{ height: "100%" }}
                        dangerouslySetInnerHTML={{ __html: this.props.body }}
                    />
                    {this.props.postBodyComponents}
                    <script
                        src="https://cdn.cookielaw.org/consent/b96996cf-1232-4300-878b-3ab79555ca3f.js"
                        type="text/javascript"
                        charSet="UTF-8"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                function OptanonWrapper() { }
                            `
                        }}
                    />
                </body>
            </html>
        );
    }
};
