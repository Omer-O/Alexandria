import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export class PopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleSecondClick = this.handleSecondClick.bind(this);
    }
    handleClick(e) {
        this.setState({
            menu: true
        });
    } //handleClick close.
    handleSecondClick(e) {
        this.setState({
            menu: false
        });
    } //handleSecondClick close.
    render() {
        return (
            <div className="pop-menu-wraper">
                <div>
                    <button
                        className="pop-menu-on"
                        onClick={e => this.handleClick(e)}
                    >
                        menu
                    </button>
                </div>
                {this.state.menu && (
                    <div>
                        <div className="header-pop-menu">
                            <img
                                className="avatar-img"
                                src={"/img/profilepic.jpg"}
                                alt={"profilepic"}
                            />
                            //link to signout/in
                        </div>
                        <div className="pop-menu-container">
                            <button
                                className="pop-menu-off"
                                onClick={e => this.handleSecondClick(e)}
                            >
                                close X
                            </button>
                            <ul className="menu-list">
                                //later will be wrapped with LINK
                                <li>log out</li>
                                <li>all docs</li>
                                <li>tags</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
