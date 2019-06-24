import React from "react";
import Webcam from "react-webcam";

export class WebcamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.elemRef = React.createRef();
    } //constructor close.
    onTakePhoto(dataUri) {}
    capture() {
        const imageSrc = this.onTakePhoto(dataUri);
        console.log("capture:", imageSrc);
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.elemRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}
