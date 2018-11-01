import React from "react";
import { AnchorButton } from "@blueprintjs/core";
import { Link } from "react-router-dom";

const LoginAnchor = (props) => (
    <div className="login-anchor-container">
        <Link to="/login">登录</Link>
        <span>发表评论</span>
    </div>
)

export default LoginAnchor;
