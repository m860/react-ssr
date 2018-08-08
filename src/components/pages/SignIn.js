import React from "react"
import BasePage from "./BasePage"

export default class SignIn extends BasePage {
    render() {
        return (
            <div className="signin">
                <div className="content">
                    <div className="logo">
                        <img src={require("../../assets/img/logo.png")}/>
                    </div>
                    <div className="title">
                        欢迎登录 Alive Push
                    </div>
                    <div className="form">
                        <div className="form-row">
                            <label>用户名</label>
                            <input type="text"/>
                        </div>
                        <div className="form-row">
                            <label>密码</label>
                            <input type="password"/>
                        </div>
                        <div className="form-row">
                            <button type="button">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}