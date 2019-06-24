<<<<<<< HEAD
import React, { Component } from "react";

export class CameraFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    processDevices(devices) {
        devices.forEach(device => {
            console.log(device.label);
            this.setDevice(device);
        });
    }

    setDevice(device) {
        const { deviceId } = device;
        const stream = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { deviceId }
        });
        this.videoPlayer.srcObject = stream;
        this.videoPlayer.play();
    }

    componentDidMount() {
        const cameras = navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    takePhoto() {
        const { sendFile } = this.props;
        const context = this.canvas.getContext("2d");
        context.drawImage(this.videoPlayer, 0, 0, 680, 360);
        this.canvas.toBlob(sendFile);
    }

    uploadImage(file) {
        const formData = new FormData();
        formData.append("file", file);
        // Connect to a seaweedfs instance
    }

    render() {
        return (
            <div className="c-camera-feed">
                <div className="c-camera-feed__viewer">
                    <video
                        ref={ref => (this.videoPlayer = ref)}
                        width="680"
                        heigh="360"
                    />
                </div>
                <button onClick={this.takePhoto}>Take photo!</button>
                <div className="c-camera-feed__stage">
                    <canvas
                        width="680"
                        height="360"
                        ref={ref => (this.canvas = ref)}
                    />
                </div>
            </div>
        );
    }
}
=======
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
>>>>>>> b2a5df4679fe1d72938d97d17b48b9dc40231e3f
