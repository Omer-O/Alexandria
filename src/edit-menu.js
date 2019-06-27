import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export class EditMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false };
        this.showMenu = this.showMenu.bind(this);
    }
    showMenu(e) {
        if (this.state.showMenu) {
            this.setState({
                showMenu: false
            });
        } else {
            this.setState({
                showMenu: true
            });
        }
    }

    render() {
        return (
            <div className="profile-wraper">
                <div>
                    <button
                        className="popup-btn"
                        onClick={e => this.showMenu(e)}
                    >
                        <FontAwesomeIcon icon={faUserCircle} />
                    </button>
                </div>
                {this.state.showMenu && (
                    <div className="popup-menu">
                        <div className="bright-side">
                            <div className="header-pop-menu">
                                <img
                                    className="avatar-img"
                                    src={"/img/profilepic.jpg"}
                                    alt={"profilepic"}
                                />
                                //link to signout/in
                            </div>
                            <div className="pop-menu-container">
                                <ul className="menu-list">
                                    //later will be wrapped with LINK
                                    <li>Edit Title</li>
                                    <li>Edit Tags</li>
                                    <li>tags</li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="dark-side"
                            onClick={e => this.showMenu(e)}
                        />
                    </div>
                )}
            </div>
        );
    }
}
