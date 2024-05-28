import React from 'react';
import { FaCar, FaBed } from 'react-icons/fa';

const IconRenderer = ({ iconName }) => {
    switch (iconName) {
        case 'FaCar':
            return <FaCar />;
        case 'TbBedFilled':
            return <FaBed />;
        default:
            return null;
    }
};

export default IconRenderer;
// 객체에 아이콘 값 넣어서 렌더링