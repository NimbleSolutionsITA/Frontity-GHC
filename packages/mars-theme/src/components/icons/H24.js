import React from 'react';
import {SvgIcon} from "@material-ui/core";

const H24Icon = ({color = "#1F407D", width = '32px', height = '32px', ...props}) => {
    const col = color === 'primary' ? "#1F407D" : "#FFFFFF";
    return (
        <svg width={width} fill="none" viewBox="0 0 32 32" {...props}>
            <path stroke={col} d="M20.8 25.91C16.46 28.11 11.02 27.39 7.39 23.76C2.87 19.24 2.87 11.91 7.39 7.39C11.91 2.87 19.24 2.87 23.76 7.39" strokeWidth="3" strokeMiterlimit="10"/>
            <path fill={col} d="M12.7002 18.55H15.4502V19.93H9.97021L13.5702 15.08C13.8402 14.69 14.0002 14.31 14.0002 13.97C14.0002 13.68 13.8502 13.42 13.6202 13.23C13.3902 13.04 13.0502 12.94 12.6902 12.94C12.3002 12.94 12.0002 13.08 11.7902 13.24C11.6102 13.38 11.4702 13.72 11.4402 13.99H9.98022C9.99022 13.91 9.99022 13.81 10.0002 13.72C10.1402 12.38 11.2502 11.58 12.7402 11.58C13.4802 11.58 14.1602 11.81 14.6502 12.22C15.1702 12.65 15.4502 13.3 15.4502 13.97C15.4502 14.68 15.2602 15.28 14.7202 15.96L12.7002 18.55Z"/>
            <path fill={col} d="M21.8902 18.14H20.4502V19.93H19.0002V18.14H14.6002L20.4502 11.4V16.78H21.8902V18.14ZM19.0002 15.14L17.5802 16.78H19.0002V15.14Z"/>
            <path fill={col} d="M28.6801 12.35L26.8001 4.26999L20.6001 10.46L28.6801 12.35Z"/>
            <path stroke={col} d="M26.9399 17.79C27.0999 16.96 27.1699 16.11 27.1499 15.25" strokeWidth="3" strokeMiterlimit="10"/>
            <path stroke={col} d="M25.4399 21.63C25.8299 20.99 26.1599 20.31 26.4199 19.61" strokeWidth="3" strokeMiterlimit="10"/>
            <path stroke={col} d="M22.5098 24.85C23.1398 24.38 23.7098 23.85 24.2198 23.28" strokeWidth="3" strokeMiterlimit="10"/>
        </svg>
    )
}

export default H24Icon;