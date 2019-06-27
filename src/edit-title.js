import React from "react";
import axios from "./axios";

export class Bio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorVisible: false
        };
        this.showBioEditor = this.showBioEditor.bind(this);
        this.hideBioEditor = this.hideBioEditor.bind(this);
    }
    handleChange({ target }) {
        console.log("name: ", target.name);
        // console.log("target value: ", target.value);
        this.setState({
            newBio: target.value
        });
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/edit-bio", {
                bio: this.state.newBio
            })
            .then(() => {
                console.log("hide");
                this.hideBioEditor();
                this.props.updateBio(this.state.newBio);
            });
    }
    showBioEditor() {
        this.setState({
            editorVisible: true
        });
    }
    hideBioEditor(e) {
        this.setState({
            editorVisible: false
        });
    }

    render() {
        var bio = this.props.bio || "go on, write your bio";

        return (
            <div className="bio-container" onClick={this.showBioEditor}>
                <div className="text-container">{bio}</div>

                {this.state.editorVisible && (
                    <div className="bio-editor">
                        <div
                            className="x-bio-editor-btn"
                            onClick={this.hideBioEditor}
                        >
                            x
                        </div>
                        <form
                            onSubmit={e => this.submit(e)}
                            className="bio-form"
                        >
                            <textarea
                                rows="10"
                                cols="85"
                                name="textarea"
                                onChange={e => this.handleChange(e)}
                                defaultValue={this.props.bio}
                            />

                            <button className="login-form-btn" type="submit">
                                Save changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}
