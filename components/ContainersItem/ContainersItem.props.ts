import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Statistics } from 'interfaces/statistics.interface';


export interface ContainersItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	value: string,
    label: string,
    statistics: Statistics[],
    setContainers: (e: any) => void,
}
