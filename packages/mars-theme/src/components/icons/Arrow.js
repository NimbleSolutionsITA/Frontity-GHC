import React from 'react';
import {SvgIcon} from "@material-ui/core";

const ArrowIcon = ({color, back, ...props}) => {
    return (
        <SvgIcon {...props} style={{fill: 'transparent', transform: back && 'rotate(180deg)'}} viewBox="0 0 12 36">
            <path d="M2 2L10 18L2 34"  stroke={color || '#FFFFFF'} strokeWidth="3" strokeLinecap="round"/>
        </SvgIcon>
    )
}

export default ArrowIcon;
