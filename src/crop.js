import ReactCrop from "react-image-crop";
import React, { Component } from "react";
import "react-image-crop/dist/ReactCrop.css";

export class ImageCrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            crop: {
                aspect: 1 / 1
            }
        };
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        const base64Image = canvas.toDataURL("image/jpeg");
        const croppedImg = getCroppedImg(image, crop, fileName);
    }
    handleOnCropChange(crop) {
        console.log(crop);
        this.setState({ crop: crop });
        console.log(this.state);
    }
    handleImageAfterCrop(image) {
        console.log(image);
    }
    handleOnCropComplete(crop, imageCrop) {
        console.log(crop, imageCrop);
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
                        handleOnCropComplete={(crop, imageCrop) =>
                            this.handleOnCropComplete(crop, imageCrop)
                        }
                        onChange={crop => this.handleOnCropChange(crop)}
                    />
                </div>
            </div>
        );
    }
}
