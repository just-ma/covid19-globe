import React from "react";
import "./Loading.scss";
let logo = require("../../assets/logo2.svg");

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading__container">
                <img src={logo} />
            </div>
            <div className="loading__circle -first" />
            <div className="loading__circle -second" />
        </div>
    );
}
