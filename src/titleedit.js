import React from "react";
import axios from "./axios";
import { App } from "./app";
import { ImgViewer } from "./img-viewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export class TitleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.saveTitle = this.saveTitle.bind(this);
    } //constructor close.
    handleChange({ target }) {
        this.setState({
            title: target.value
        });
    } //handleChange close.
    handleClick(e) {
        this.setState({ editTitle: true });
    } //handleClick close.
    handleSecondClick(e) {
        this.setState({ editTitle: false });
    } //handleSecondClick close.
    saveTitle(e) {
        e.preventDefault();
        console.log("saveTitle clicked");
        axios
            .post("/update-title", {
                title: this.state.title,
                id: this.props.id
            })
            .then(result => {
                console.log("this is result of titleEditor:", result);
                this.props.titleEdit(result.data.title);
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    } //saveTitle close.
    render() {
        return (
            <div className="title-wraper">
                {this.state.error}
                <div className="title-container">
                    <div
                        className="edit-btn"
                        onClick={e => this.handleClick(e)}
                    >
                        <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                    </div>
                </div>
                {this.state.editTitle && (
                    <div className="textarea-container">
                        <textarea
                            className="text-field"
                            type="text"
                            name="textarea"
                            onChange={e => this.handleChange(e)}
                        />
                        <div
                            className="edit-click"
                            type="submit"
                            name="button"
                            onClick={e => this.saveTitle(e)}
                        >
                            <FontAwesomeIcon
                                className="edit-click"
                                icon={faCheck}
                                onClick={e => this.handleSecondClick(e)}
                            />
                        </div>
                    </div>
                )}
            </div>
        ); //render-return close.
    } //render close.
} //Welcome clos.
