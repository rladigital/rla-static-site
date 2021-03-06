export const colors = {
    primary: "#86c3c4",
    accent: "#D72257",
    secondary: "#3a3e46",
    black: "#0C141B",
    white: "#ffffff",
    lightBlueGray: "#272E48",
    mediumBlueGray: "#272E48",
    darkBlueGray: "#07172C",
    reallyDarkBlueGray: "#05101f",
    lightGray: "#868D98",
    mediumGray: "#5A677F",
    darkGray: "#22262c",
    alert: "#f44336",
    warning: "#ff9800",
    success: "#4caf50",
    info: "#00bcd4",
    background: "#07172C"
};

export const sizes = {
    small: "1.5",
    default: "2",
    large: "3"
};

export const spacing = {
    radius: "0.2",
    padding: "1.5",
    margin: "1.5"
};

export const breakpoints = {
    small: 0,
    medium: 550,
    large: 700,
    xlarge: 1050
};

const theme = {
    spacing: spacing,
    darkColor: colors.background,
    lightColor: colors.white,
    accent: colors.accent,
    spacing: spacing,
    breakpoints: breakpoints,
    body: {
        color: colors.white,
        background: colors.background,
        fontFamily: "Avenir, sans-serif"
    },
    anchor: {
        color: colors.lightGray,
        textDecoration: "none",
        fontWeight: "bold"
    },
    paragraph: {
        margin: spacing.margin
    },
    table: {
        thead: {
            textTransform: "uppercase"
        },
        backgroundColor: "transparent",
        stripeColor: "rgba(185, 203, 203, 0.02)",
        border: "1px solid " + colors.secondary,
        padding: spacing.padding
    },
    headings: {
        fontFamily: "Gotham, Avenir, sans-serif"
    },
    header: {
        logoMargin: spacing.margin + "em 0"
    },
    footer: {
        background: colors.accent,
        padding: spacing.padding
    },
    navigation: {
        navLink: {
            margin: 0,
            color: colors.white,
            activeColor: colors.accent,
            padding: 0.8,
            textTransform: "uppercase"
        }
    },
    pageHeaderSection: {
        fontSize: 4,
        padding: {
            top: 8,
            right: 0,
            bottom: 5,
            left: 0
        }
    },
    button: {
        fontWeight: "600",
        textTransform: "uppercase",
        borderRadius: 0.6,
        padding: 5
    },
    column: {
        columns: 12,
        padding: spacing.padding,
        breakpoints: breakpoints
    },
    panel: {
        default: "secondary"
    },

    icon: {
        colors: colors
    },
    input: {
        sizes: sizes,
        borderColor: colors.secondary,
        padding: spacing.padding,
        margin: spacing.margin,
        radius: spacing.radius,
        colors: colors,
        error: {
            borderColor: colors.alert
        }
    },
    modal: {
        padding: 0,
        margin: spacing.margin,
        radius: spacing.radius,
        background: colors.black,
        color: colors.black,
        closeButtonColor: colors.black
    },
    tabordion: {
        padding: spacing.padding,
        margin: spacing.margin,
        borderThickness: "1px",
        borderColor: colors.white,
        fontWeight: "bold",
        default: {
            color: colors.white,
            background: colors.darkGray
        },
        active: {
            color: colors.accent,
            background: colors.white
        },
        content: {
            color: colors.black,
            background: colors.white
        },
        dividers: {
            height: 2.5,
            padding: 0.7,
            fontSize: 0.4,
            fontWeight: "bold",
            color: colors.white,
            background: colors.mediumGray,
            border: "1px solid " + colors.white,
            radius: 2
        },
        twisty: {
            size: 2,
            color: colors.white,
            background: "transparent",
            nonActiveIcon: "arrowDown",
            activeIcon: "arrowUp"
        },
        tabs: {
            textAlign: "center"
        },
        accordion: {
            textAlign: "left"
        }
    },

    tooltip: {
        color: colors.white,
        background: colors.accent,
        padding: spacing.padding,
        margin: spacing.margin,
        radius: spacing.radius
    },
    link: {
        color: colors.black,
        colors: colors,
        fontWeight: "bold",
        textDecoration: "none"
    },
    dashboard: {
        panel: {
            bar: {
                iconSize: "1.2",
                iconColor: "#7a8186",
                padding: "0.5",
                background: " #414b52",
                fontWeight: "bold",
                fontSize: "0.9",
                titleColor: colors.white
            },
            content: {
                background: colors.secondary
            },
            wrapper: {
                radius: 0
            },
            resize: {}
        }
    },
    userInfo: {
        spacingX: 0.4,
        spacingY: 0.3,
        padding: spacing.padding,
        height: 7,
        icon: {
            size: 1,
            color: colors.primary
        },
        notification: {
            size: 0.7,
            top: -0.5,
            right: -0.5,
            minWidth: 1,
            color: colors.white,
            backgroundColor: colors.primary
        },
        title: {
            size: 0.8,
            color: colors.white
        },
        text: {
            size: 0.6,
            color: colors.white
        },
        backgroundColor: colors.accent
    },
    menu: {
        color: colors.primary,
        background: colors.background,
        hoverBackground: colors.darkGray,
        borderBottom: "1px solid " + colors.accent,
        padding: 0.8
    },
    steps: {
        barHeight: 14,
        spacing: -4,
        circleDiameter: 40,
        progressColor: colors.primary,
        backgroundColor: colors.background,
        borderColor: "transparent",
        borderRadius: 50,
        labelColor: "inherit",
        margin: spacing.margin,
        border: 1,
        padding: 4
    },
    checkboxButton: {
        activeColor: "primary",
        defaultColor: "mediumGray"
    },
    carousel: {
        item: {
            padding: 0,
            background: "transparent",
            color: "inherit"
        },
        arrows: {
            size: 1,
            color: colors.mediumGray
        },
        dots: {
            background: colors.mediumGray
        }
    }
};

export default theme;
