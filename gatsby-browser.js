/* eslint-disable react/prop-types */
/* globals window CustomEvent */
import React, { createElement } from "react";
import { Transition } from "react-transition-group";
import WebFont from "webfontloader";
import createHistory from "history/createBrowserHistory";

import getTransitionStyle from "./src/utils/getTransitionStyle";

const timeout = 250;
const historyExitingEventType = `history::exiting`;

const getUserConfirmation = (pathname, callback) => {
    const event = new CustomEvent(historyExitingEventType, {
        detail: { pathname }
    });
    window.dispatchEvent(event);
    setTimeout(() => {
        callback(true);
    }, timeout);
};
const history = createHistory({ getUserConfirmation });
// block must return a string to conform
history.block((location, action) => location.pathname);
exports.replaceHistory = () => history;

class ReplaceComponentRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exiting: false,
            nextPageResources: {},
            scrolltop: true,
            font: false
        };
        this.listenerHandler = this.listenerHandler.bind(this);
    }

    listenerHandler(event) {
        const nextPageResources =
            this.props.loader.getResourcesForPathname(
                event.detail.pathname,
                nextPageResources => this.setState({ nextPageResources })
            ) || {};
        this.setState({ exiting: true, nextPageResources });
    }

    handleScroll() {
        const scrolltop = !Boolean(window.scrollY > 0);

        if (scrolltop != this.state.scrolltop) {
            this.setState({ scrolltop: scrolltop });
        }
    }

    componentDidMount() {
        window.addEventListener(historyExitingEventType, this.listenerHandler);
        window.addEventListener("scroll", () => this.handleScroll());

        // Load web font
        WebFont.load({
            google: {
                families: ["Montserrat:400,700,900", "sans-serif"]
            },

            active: () => {
                this.setState({ font: "Montserrat" });
            },

            inactive: () => {
                this.setState({ font: "Arial" });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener(
            historyExitingEventType,
            this.listenerHandler
        );
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.key !== nextProps.location.key) {
            this.setState({ exiting: false, nextPageResources: {} });
        }
    }

    render() {
        const transitionProps = {
            timeout: {
                enter: 0,
                exit: timeout
            },
            appear: true,
            in: !this.state.exiting,
            key: this.props.location.key
        };
        return (
            <Transition {...transitionProps}>
                {status =>
                    createElement(this.props.pageResources.component, {
                        ...this.props,
                        ...this.props.pageResources.json,
                        transition: {
                            status,
                            timeout,
                            style: getTransitionStyle({ status, timeout }),
                            nextPageResources: this.state.nextPageResources
                        },
                        scrolltop: this.state.scrolltop,
                        font: this.state.font
                    })
                }
            </Transition>
        );
    }
}

// eslint-disable-next-line react/display-name
exports.replaceComponentRenderer = ({ props, loader }) => {
    if (props.layout) {
        return undefined;
    }
    return createElement(ReplaceComponentRenderer, { ...props, loader });
};
