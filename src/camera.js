import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export function Camera(props) {
    return (
        <div className="camera">
            <video id="video" />
            <button id="startButton" onClick={props.handleStartClick}>
                <FontAwesomeIcon icon={faCircle} />
            </button>
        </div>
    );
}
