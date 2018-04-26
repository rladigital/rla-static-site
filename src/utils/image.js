export const getOriginalImageSrc = imageField => {
    if (typeof imageField.responsive === "undefined") {
        return imageField;
    }
    if (
        imageField.responsive === null ||
        typeof imageField.responsive.childImageSharp === "undefined" ||
        imageField.responsive.childImageSharp === null
    ) {
        return imageField.original;
    }
    return imageField.responsive.childImageSharp.original.src || null;
};
