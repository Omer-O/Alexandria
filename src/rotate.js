import React, { Component } from "react";
import { CapturedImage } from "./captured-image";

export class RotateImage extends React.Component {
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
            <div>
                <input onClick={this.rotateleft} type="button" value="left" />
                <img
                    style={{ transform: `rotate(${rotation}deg)` }}
                    src={this.props.CapturedImage}
                />
                <input onClick={this.rotate} type="button" value="right" />
            </div>
        );
    }
}
// <img
//     style={{ transform: `rotate(${rotation}deg)` }}
//     src={this.props.src}
//     width="400"
// />
