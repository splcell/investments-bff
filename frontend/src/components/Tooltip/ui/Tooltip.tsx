import styles from './Tooltip.module.scss'
import cn from 'classnames'

interface TooltipProps{
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = ({children, className}: TooltipProps) => {
	return (
		<div className={cn(styles.tooltipWrapper, className)}>
      {children}
    </div>
	);
};



