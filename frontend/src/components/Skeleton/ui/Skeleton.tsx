import { memo, type CSSProperties } from 'react';
import styles from './Skeleton.module.scss';
import cn from 'classnames'

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
    } = props;

    const style: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={cn(styles.skeleton, {}, className)}
            style={style}
        />
    );
});