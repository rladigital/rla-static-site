import PropTypes from "prop-types";
import React, { Component } from "react";
import { ObjectPreview } from "netlify-cms-widget-object";

const ListPreview = ObjectPreview;

ListPreview.propTypes = {
    field: PropTypes.node
};

export default ListPreview;
