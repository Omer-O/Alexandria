import React, { Component } from "react";

export function Camera(props) {
    return (
        <div className="camera">
            <video id="video" />
            <a id="startButton" onClick={props.handleStartClick}>
                Take photo
            </a>
        </div>
    );
}
