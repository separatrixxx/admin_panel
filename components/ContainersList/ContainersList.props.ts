import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container } from '../../interfaces/container.interface';
import { Statistics } from 'interfaces/statistics.interface';


export interface ContainersListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	containers: Container[],
	statistics: Statistics[],
	setContainers: (e: any) => void,
}
