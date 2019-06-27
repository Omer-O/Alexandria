import React from "react";
import { Link } from "react-router-dom";
import { Ocr } from "./ocr";
import axios from "./axios";

import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImgViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.deleteImg = this.deleteImg.bind(this);
    }
    componentDidMount() {}
    deleteImg() {
        console.log("this.props.props.img_url", this.props.props.img_url);
        axios
            .post("/delete", {
                url: this.props.props.img_url,
                id: this.props.props.id
            })
            .then(data => {
                console.log("deleted img id ", data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return (
            <div className="wrapper">
                <header>
                    <Link to="/home">
                        <FontAwesomeIcon icon={faUndo} className="nav-btn" />
                    </Link>
                    <div className="nav-btn">fjlksdf</div>
                </header>
                <div className="mid-section">
                    <div className="img-viewer">
                        <h3>{this.props.props.title}</h3>
                        <img
                            src={this.props.props.img_url}
                            alt="sjkfsnd"
                            id="read"
                        />
                    </div>
                </div>
                <footer>
                    <div className="nav-btn">rotate</div>
                    {this.props.props.txt ? (
                        <div
                            className="nav-btn"
                            onClick={e => {
                                this.props.showText();
                            }}
                        >
                            View Text
                        </div>
                    ) : (
                        <Ocr
                            img_url={this.props.props.img_url}
                            docId={this.props.props.id}
                        />
                    )}
                    <div className="nav-btn" onClick={this.deleteImg}>
                        delete
                    </div>
                </footer>
            </div>
        );
    }
}
