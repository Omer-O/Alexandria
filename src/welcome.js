import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { Registration } from "./registration";
import { Login } from "./login";

export function Welcome() {
    return (
        <div className="welcome-wrapper">
            <HashRouter>
                <div>
                    <Login />
                    <Registration />
                </div>
            </HashRouter>
            <div />
        </div>
    );
}
