import React from "react";
import { Link } from "react-router-dom";
import { Ocr } from "./ocr";

import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class ImgViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

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
                </footer>
            </div>
        );
    }
}
