import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";
import "./style.scss";

class LoginContainer extends Component {
    render() {
        let { from } = this.props.location.state || { from: { pathname: "/" } };

        if (Auth.isAuthenticated()) {
            return <Redirect to={from} />
        }
        return (
            <div className="container flex justify-center">
                <div className="oauth-container">
                    <div className="h4 mb2">使用第三方平台登录</div>
                    <a className="block my2" href="/auth/github">
                        <Button intent="success" fill={true}>Github 登录</Button>
                    </a>
                    <a className="block my2" href="/auth/google">
                        <Button intent="danger" fill={true}>Google 登录</Button>
                    </a>
                </div>
            </div>
        );
    }
};

export default LoginContainer;
