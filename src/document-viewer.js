import React from "react";
import axios from "./axios";
import { Ocr } from "./ocr";
import { TextViewer } from "./text-viewer";
import { getDocs } from "./actions";
import { Link } from "react-router-dom";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TextVisible: false
        };
        this.hideText = this.hideText.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get("/document/" + id).then(({ data }) => {
            //console.log("request for same user");
            if (data.success == false) {
                this.props.history.push("/");
            } else {
                //        console.log("data at other profile", data);
                this.setState(data);
                console.log("this.state :", this.state);
            }
        });
    }
    showText() {
        this.setState({
            TextVisible: true
        });
        this.state.TextVisible;
    }
    hideText() {
        this.setState({
            TextVisible: false
        });
        console.log("scanner visible", this.state.scannerVisible);
    }
    render() {
        return (
            <div className="document-viewer full-screen">
                {this.state.TextVisible ? (
                    <TextViewer txt={this.state.txt} hide={this.hideText} />
                ) : (
                    <div className="img-viewer full-screen">
                        <header>
                            <FontAwesomeIcon
                                icon={faUndo}
                                className="nav-btn"
                            />

                            <div className="nav-btn">fjlksdf</div>
                        </header>
                        <h3>{this.state.title}</h3>
                        <img src={this.state.img_url} alt="sjkfsnd" id="read" />

                        {this.state.txt ? (
                            <button
                                className="save-btn"
                                onClick={e => {
                                    this.showText();
                                }}
                            >
                                View Text
                            </button>
                        ) : (
                            <Ocr
                                img_url={this.state.img_url}
                                docId={this.state.id}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
