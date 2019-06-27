import React, { Component } from "react";
import { WebcamCapture } from "./webcam";
import { Link } from "react-router-dom";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

export class CapturedImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotation: 0
        };
        this.rotate = this.rotate.bind(this);
        this.rotateleft = this.rotateleft.bind(this);
    }

    rotate() {
        let newRotation = this.state.rotation + 90;
        if (newRotation >= 360) {
            newRotation = -360;
        }
        this.setState({
            rotation: newRotation
        });
    }

    rotateleft() {
        let newRotation = this.state.rotation - 90;
        if (newRotation >= 360) {
            newRotation = -360;
        }
        this.setState({
            rotation: newRotation
        });
    }
    render() {
        const { rotation } = this.state;

        return (
            <div className="wrapper">
                <div className="captured-img-container">
                    {this.props.cameraVisible && <WebcamCapture />}
                    <img
                        id="photo"
                        alt="Your photo"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                </div>
                <footer className="captured-nav">
                    <div onClick={this.props.showCamera}>
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="nav-btn back icon"
                        />
                    </div>
                    <div className="nav-btn" onClick={this.rotateleft}>
                        <FontAwesomeIcon
                            icon={faUndo}
                            className="nav-btn icon"
                        />
                    </div>
                    <div className="nav-btn" onClick={this.rotate}>
                        <FontAwesomeIcon
                            icon={faRedo}
                            className="nav-btn icon"
                        />
                    </div>
                    <div className="nav-btn" onClick={this.props.savePicture}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className="nav-btn icon"
                        />
                    </div>
                </footer>
            </div>
        );
    }
}
