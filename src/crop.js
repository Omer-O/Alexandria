import ReactCrop from "react-image-crop";
import React, { Component } from "react";
import "react-image-crop/dist/ReactCrop.css";
import { Camera } from "./camera";
import { CapturedImage } from "./captured-image";

export class ImageCrop extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            crop: {
                aspect: 1 / 1
            },
            constraints: {
                audio: false,
                video: { width: 1000, height: 1200 }
            }
        };
    }
    componentDidMount() {
        const canvas = document.querySelector("canvas");
        const photo = document.getElementById("photo");
        const context = canvas.getContext("2d");
        const { width, height } = this.state.constraints.video;
        context.fillRect(0, 0, width, height);

        const data = canvas.toDataURL("image/jpeg");
        photo.setAttribute("src", data);
    }

    getCroppedImg() {
        const canvas = document.querySelector("canvas");
        const context = canvas.getContext("2d");
        const video = document.querySelector("video");
        const photo = document.getElementById("photo");
        const { width, height } = this.state.constraints.video;
        canvas.width = crop.width;
        canvas.height = crop.height;
        context.drawImage(video, 0, 0, width, height);

        const data = canvas.toDataURL("image/jpeg");
        photo.setAttribute("src", data);

        canvas.toBlob(function(blob) {
            console.log("this is data of takePicture:", blob);
            const formData = new FormData();
            formData.append("file", blob);
        });
    }
    handleOnCropChange(crop) {
        console.log(crop);
        this.setState({ crop: crop });
        console.log(this.state);
    }
    handleImageAfterCrop(image) {
        console.log(image);
    }
    handleOnCropComplete(e) {
        e.preventDefault();
        this.getCroppedImg();

        console.log(e);
    }
    render() {
        return (
            <div>
                <h2>image crop</h2>
                <div>
                    <ReactCrop
                        src={"/msg.PNG"}
                        crop={this.state.crop}
                        handleImageAfterCrop={image =>
                            this.handleImageAfterCrop(image)
                        }
                        handleOnCropComplete={this.handleStartClick}
                        onChange={crop => this.handleOnCropChange(crop)}
                    />
                </div>
                <div>
                    <Camera />
                    <CapturedImage />
                </div>
                <canvas id="canvas" hidden />
            </div>
        );
    }
}
