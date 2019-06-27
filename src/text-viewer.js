import React from "react";
import axios from "./axios";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Speak } from "./speak";

export class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("TextViewer mount!!!!!!!!");
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
            <div className="wrapper">
                <header>
                    <FontAwesomeIcon
                        icon={faUndo}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />

                    <div className="nav-btn">{this.state.title}</div>
                </header>
                <div className="mid-section">
                    <div className="text-viewer">
                        <p>{this.state.txt}</p>
                    </div>
                    <Speak txt={this.state.txt} />
                </div>
                <footer>
                    <FontAwesomeIcon
                        icon={faUndo}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />

                    <div className="nav-btn">{this.state.title}</div>
                </footer>
            </div>
        );
    }
}
