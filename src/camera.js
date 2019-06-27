import React, { Component } from "react";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export function Camera(props) {
    return (
        <div className="wrapper video">
            <video id="video" />
            <button
                id="startButton"
                className="capture-btn"
                onClick={props.handleStartClick}
            >
                <FontAwesomeIcon icon={faCircle} />
            </button>
            <Link to="/home">
                <FontAwesomeIcon icon={faArrowLeft} className="stop-cam" />
            </Link>
        </div>
    );
}
