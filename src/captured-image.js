import React, { Component } from "react";
import { WebcamCapture } from "./webcam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export function CapturedImage(props) {
    return (
        <div className="captured-img-container">
            {props.cameraVisible && <WebcamCapture />}``
            <img id="photo" alt="Your photo" />
        </div>
    );
}
