import React, { Component } from "react";
import axios from "./axios";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

export class App extends Component {
    onTakePhoto(dataUri) {
        console.log("takePhoto work!!!!");
        // axios
        //     .post("/data-uri", formData)
        //     .then(result => {
        //         this.props.uploaded(result.data.imageUrl);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         this.setState({
        //             error: true
        //         });
        //     });
    }

    onCameraError(error) {
        console.error("onCameraError", error);
    }

    onCameraStart(stream) {
        console.log("onCameraStart");
    }

    onCameraStop() {
        console.log("onCameraStop");
    }

    render() {
        return (
            <div className="App">
                <Camera
                    onTakePhoto={dataUri => {
                        this.onTakePhoto(dataUri);
                    }}
                    onCameraError={error => {
                        this.onCameraError(error);
                    }}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                    idealResolution={{ width: 640, height: 480 }}
                    imageType={IMAGE_TYPES.JPG}
                    imageCompression={0.97}
                    isMaxResolution={false}
                    isImageMirror={false}
                    isSilentMode={true}
                    isDisplayStartCameraError={true}
                    isFullscreen={true}
                    sizeFactor={1}
                    onCameraStart={stream => {
                        this.onCameraStart(stream);
                    }}
                    onCameraStop={() => {
                        this.onCameraStop();
                    }}
                />
            </div>
        );
    }
}
