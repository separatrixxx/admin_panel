import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	text?: string,
	isActive: boolean,
	children?: ReactNode,
	onClick: (e: any) => void,
}