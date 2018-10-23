import React from "react";
import AntIcon from "antd/lib/icon";

const ReplySvg = () => (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M426.666667 384V213.333333l-298.666667 298.666667 298.666667 298.666667v-174.933334c213.333333 0 362.666667 68.266667 469.333333 217.6-42.666667-213.333333-170.666667-426.666667-469.333333-469.333333z" p-id="1033">
        </path>
    </svg>

)

const ReplyIcon = props => (
    <AntIcon component={ReplySvg} {...props} />
)

export default ReplyIcon;
