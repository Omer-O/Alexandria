import React from "react";
import Webcam from "react-webcam";

export class WebcamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.elemRef = React.createRef();
    } //constructor close.
    // onTakePhoto(dataUri) {}
    // capture() {
    //     const imageSrc = this.onTakePhoto(dataUri);
    //     console.log("capture:", imageSrc);
    // }

    render() {
        const videoConstraints = {
            width: 480,
            height: 640,
            facingMode: "user"
        };

        return (
            <div className="camera">
                <Webcam
                    audio={false}
                    height={1400}
                    width={900}
                    ref={this.elemRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </div>
        );
    }
}
