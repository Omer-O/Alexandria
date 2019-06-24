import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class ProfileMenu extends React.Component {
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
                        className="popup-button"
                        onClick={e => this.showMenu(e)}
                    >
                        menu
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
                                    <li>log out</li>
                                    <li>all docs</li>
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
