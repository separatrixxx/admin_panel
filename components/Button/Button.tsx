import { ButtonProps } from './Button.props';
import styles from './Button.module.css';


export const Button = ({ text, children, onClick }: ButtonProps): JSX.Element => {
	return <button className={styles.button} onClick={onClick}>
        {text}
        {children}
    </button>
};