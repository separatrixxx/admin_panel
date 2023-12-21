import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';


export const Button = ({ text, isActive, isDone, children, onClick }: ButtonProps): JSX.Element => {
	return <button className={cn(styles.button, {
        [styles.disabled]: !isActive,
        [styles.done]: isDone
    })} onClick={onClick}>
        {text}
        {children}
    </button>
};