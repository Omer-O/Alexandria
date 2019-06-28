import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }
    handleChange(event) {
        this.setState(
            {
                selectedFile: event.target.files[0],
                loaded: 0
            },
            () => this.submit()
        );
    }
    submit(e) {
        const data = new FormData();
        console.log("selected file: ", this.state.selectedFile);
        data.append("file", this.state.selectedFile);
        axios
            .post("/store-document", data)
            .then(res => {
                console.log("res.data in uploader", res.data);
                this.props.hideUploader;
                this.props.uploaded(res.data.imageUrl);
            })
            .catch(e => {
                console.log("upload photo", e);
            });
    }
    render() {
        console.log("props in uploader", this.props);
        return (
            <div>
                <div className="upload-btn home-btn">
                    <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                    <form action="upload.php" method="post">
                        <input
                            type="file"
                            name="file"
                            onChange={e => this.handleChange(e)}
                        />
                    </form>
                </div>
            </div>
        );
    }
}
