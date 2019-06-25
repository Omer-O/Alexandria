import React, { Component } from "react";

export function Photo(props) {
    return (
        <div className="output">
            <img id="photo" alt="Your photo" />
            <a id="saveButton" onClick={props.handleSaveClick}>
                Save Photo
            </a>
        </div>
    );
}
