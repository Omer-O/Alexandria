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
