import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Container } from '../../interfaces/container.interface';


export interface ContainersListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	containers: Container[],
	setContainers: (e: any) => void,
}
