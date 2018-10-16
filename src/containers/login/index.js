import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import "./style.scss";

class LoginContainer extends Component {
    render() {
        return (
            <div className="container flex justify-center">
                <div className="oauth-container">
                    <div className="h4 mb2">使用第三方平台登录</div>
                    <a href="/auth/github">
                        <Button intent="success" fill={true}>Github 登录</Button>
                    </a>
                </div>
            </div>
        );
    }
};

export default LoginContainer;
