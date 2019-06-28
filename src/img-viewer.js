import React from "react";
import { Link } from "react-router-dom";
import { Ocr } from "./ocr";
import { TitleEditor } from "./titleedit";
import axios from "./axios";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImgViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotation: 0,
            alert: false,
            title: this.props.props.title
        };
        this.deleteImg = this.deleteImg.bind(this);
        this.rotate = this.rotate.bind(this);
        this.rotateleft = this.rotateleft.bind(this);
        this.alert = this.alert.bind(this);
        this.titleEdit = this.titleEdit.bind(this);
    }
    componentDidMount() {}
    alert() {
        if (this.state.alert) {
            this.setState({ alert: false });
        } else {
            this.setState({ alert: true });
        }
    }
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
    titleEdit(title) {
        this.setState({
            title: title
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
                            className="nav-btn back icon"
                        />
                    </Link>
                    <Link to="/home">
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            className="nav-btn back icon"
                        />
                    </Link>
                </header>
                <div className="mid-section">
                    <div className="img-viewer">
                        <img
                            src={this.props.props.img_url}
                            alt={this.props.props.title}
                            id="read"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                        <div className="title-editor">
                            <TitleEditor
                                id={this.props.props.id}
                                title={this.state.title}
                                titleEdit={this.titleEdit}
                            />
                            <h3>
                                {this.state.title || this.props.props.title}
                            </h3>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="nav-btn" onClick={this.rotateleft}>
                        <FontAwesomeIcon
                            icon={faUndo}
                            className="nav-btn icon"
                        />
                    </div>
                    <div className="nav-btn" onClick={this.rotate}>
                        <FontAwesomeIcon
                            icon={faRedo}
                            className="nav-btn icon"
                        />
                    </div>{" "}
                    {this.props.props.txt ? (
                        <div
                            className="nav-btn"
                            onClick={e => {
                                this.props.showText();
                            }}
                        >
                            Text
                        </div>
                    ) : (
                        <Ocr
                            img_url={this.props.props.img_url}
                            docId={this.props.props.id}
                            showText={this.props.showText}
                        />
                    )}
                    <div className="nav-btn" onClick={this.alert}>
                        <FontAwesomeIcon icon={faTrash} className="nav-btn" />
                    </div>
                    {this.state.alert && (
                        <div className="alert">
                            <div>are you sure? </div>
                            <div className="delete">
                                <span onClick={this.alert}>no</span>
                                <Link to="/home">
                                    {" "}
                                    <span onClick={this.deleteImg}>yes</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </footer>
            </div>
        );
    }
}
