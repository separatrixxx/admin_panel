import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';


export const Button = ({ text, isActive, children, onClick }: ButtonProps): JSX.Element => {
	return <button className={cn(styles.button, {
        [styles.disabled]: !isActive
    })} onClick={onClick}>
        {text}
        {children}
    </button>
};