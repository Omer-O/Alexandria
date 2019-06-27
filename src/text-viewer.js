import React from "react";
import axios from "./axios";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Speak } from "./speak";

export class TextViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drakula: false,
            alexandria: false
        };
        this.drakula = this.drakula.bind(this);
        this.alexandria = this.alexandria.bind(this);
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
    drakula() {
        if (this.state.drakula) {
            this.setState({ drakula: false });
        } else {
            this.setState({ drakula: true });
        }
    }
    alexandria() {
        if (this.state.alexandria) {
            this.setState({ alexandria: false });
        } else {
            this.setState({ alexandria: true });
        }
    }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="nav-btn"
                        onClick={this.props.hide}
                    />
                </header>
                <div className="mid-section">
                    <div
                        className={
                            this.state.drakula
                                ? "dark text-viewer"
                                : "normal text-viewer"
                        }
                    >
                        <p>{this.state.txt}</p>
                    </div>
                    {this.state.alexandria && <Speak txt={this.state.txt} />}
                </div>
                <footer>
                    <div className="filler" />
                    <div className="nav-btn" onClick={this.drakula}>
                        Drackula
                    </div>
                    <div className="nav-btn" onClick={this.alexandria}>
                        Alexandria
                    </div>
                    <div className="filler" />
                </footer>
            </div>
        );
    }
}
