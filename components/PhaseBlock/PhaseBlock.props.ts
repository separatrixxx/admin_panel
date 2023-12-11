import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PhaseBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    phase: number,
	children: ReactNode,
}
