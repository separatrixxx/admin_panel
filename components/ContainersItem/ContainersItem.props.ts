import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ContainersItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	value: string,
    label: string,
    setContainers: (e: any) => void,
}
