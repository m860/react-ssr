import React, {Component} from "react"

export default class SignIn extends Component {
    render() {
        return (
            <div className="signin">
                <div className="content">
                    <div className="logo">
                        <img src={require("../../assets/img/react.png")}/>
                    </div>
                    <div className="title">
                        <h1>
                            欢迎访问 React SSR
                        </h1>
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