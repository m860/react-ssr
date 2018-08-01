import React from "react";
import Base,{PureBase} from "../Base";

export default class ActivityIndicator extends PureBase {
    render() {
        return (
            <svg className="activity-indicator">
                <defs>
                    <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#05a"/>
                        <stop offset="100%" stopColor="#0a5"/>
                    </linearGradient>
                </defs>
                <circle
                    stroke="url(#linear)"
                    strokeWidth={10}
                    fill="none"
                    cx="50%"
                    cy="50%"
                    r="40%"></circle>
            </svg>
        );
    }
}