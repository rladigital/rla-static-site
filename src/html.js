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
                    <meta name="theme-color" content="#07172C" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#07172c"
                    />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="theme-color" content="#ffffff" />
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
