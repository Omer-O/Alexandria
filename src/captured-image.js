import React, { Component } from "react";
import { WebcamCapture } from "./webcam";
import { Link } from "react-router-dom";

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
                <footer>
                    <button onClick={this.props.showCamera}>BACK</button>

                    <button onClick={this.rotateleft} type="button">
                        left
                    </button>
                    <button onClick={this.rotate} type="button">
                        right
                    </button>
                    <button
                        className="save-img-btn"
                        onClick={this.props.savePicture}
                    >
                        SAVE
                    </button>
                </footer>
            </div>
        );
    }
}
