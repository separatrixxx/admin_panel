import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface PhaseBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: ReactNode,
}
