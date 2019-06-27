import React from "react";
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
    componentDidMount() {}
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
                        <p>{this.props.txt}</p>
                    </div>
                    {this.state.alexandria && <Speak txt={this.props.txt} />}
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
