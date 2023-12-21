import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	text?: string,
	isActive: boolean,
	isDone?: boolean,
	children?: ReactNode,
	onClick: (e: any) => void,
}