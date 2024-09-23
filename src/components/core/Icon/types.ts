import { CSSProperties } from 'react';
export type IconTag = 'span' | 'div';

export type IconProps = {
    className?: string;
    color?: string;
    size?: number | string;
    lineHeight?: number | string;
    children: string;
    style?: CSSProperties;
};
