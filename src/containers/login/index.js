import React, { Component } from "react";
import { Button } from "@blueprintjs/core";

class LoginContainer extends Component {
    render() {
        return (
            <div className="container">
                <a href="/auth/github">
                    <Button intent="success">Sign in with Github</Button>
                </a>
            </div>
        );
    }
};

export default LoginContainer;
