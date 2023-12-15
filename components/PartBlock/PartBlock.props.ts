import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface PartBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    part: 'one' | 'two' | 'three' | 'none',
}
