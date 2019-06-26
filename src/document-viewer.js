import React from "react";
import axios from "./axios";
import { Ocr } from "./ocr";
import { getDocs } from "./actions";
import { Link } from "react-router-dom";

export class DocumentViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    render() {
        return (
            <div className="document-viewer">
                <h3>{this.state.title}</h3>
                <img src={this.state.img_url} alt="sjkfsnd" id="read" />
                {this.state.txt && (
                    <div className="text-viewer">
                        <p>{this.state.txt}</p>
                    </div>
                )}
                <Ocr img_url={this.state.img_url} docId={this.state.id} />
            </div>
        );
    }
}
