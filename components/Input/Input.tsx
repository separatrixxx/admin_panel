import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';


export const Input = ({ type, text, value, error, eye, onChange }: InputProps): JSX.Element => {
	switch (type) {
		case 'email':
			return <input className={cn(styles.input, {
				[styles.error_input]: error,
				[styles.eye_input]: eye,
			})}
				placeholder={text}
				value={value}
				onChange={onChange}
				type="email"
				name="email"
				aria-label="email" />;
		case 'password':
			return <input className={cn(styles.input, {
				[styles.error_input]: error,
				[styles.eye_input]: eye,
			})}
				placeholder={text}
				value={value}
				onChange={onChange}
				type="password"
				name="password"
				aria-label="password" />;
		case 'text':
			return <input className={cn(styles.input, {
				[styles.error_input]: error,
				[styles.eye_input]: eye,
			})}
				placeholder={text}
				value={value}
				onChange={onChange}
				type="text"
				name="text"
				aria-label="text" />;
		case 'number':
			return <input className={cn(styles.input, {
				[styles.error_input]: error,
				[styles.eye_input]: eye,
			})}
				placeholder={text}
				value={value}
				onChange={onChange}
				type="number"
				name="number"
				aria-label="number" />;
		default:
			return <></>;
	}
};