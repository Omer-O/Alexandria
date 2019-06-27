import React from "react";
import { Link } from "react-router-dom";
import { Ocr } from "./ocr";
import axios from "./axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImgViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotation: 0
        };
        this.deleteImg = this.deleteImg.bind(this);
        this.rotate = this.rotate.bind(this);
        this.rotateleft = this.rotateleft.bind(this);
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
            <div className="wrapper">
                <header>
                    <Link to="/home">
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className="nav-btn"
                        />
                    </Link>
                    <div className="nav-btn">fjlksdf</div>
                </header>
                <div className="mid-section">
                    <div className="img-viewer">
                        <img
                            src={this.props.props.img_url}
                            alt={this.props.props.title}
                            id="read"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                        <h3 className="img-title">{this.props.props.title}</h3>
                    </div>
                </div>
                <footer>
                    <div className="nav-btn" onClick={this.rotateleft}>
                        <FontAwesomeIcon icon={faUndo} className="nav-btn" />
                    </div>
                    <div className="nav-btn" onClick={this.rotate}>
                        <FontAwesomeIcon icon={faRedo} className="nav-btn" />
                    </div>{" "}
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
                        <FontAwesomeIcon icon={faTrash} className="nav-btn" />
                    </div>
                </footer>
            </div>
        );
    }
}
