import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: 'email' | 'password' | 'text' | 'number',
	text: string,
	value: string | number,
	error?: boolean,
	onChange: (e: any) => void,
}