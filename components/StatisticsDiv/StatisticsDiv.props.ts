import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Statistics } from '../../interfaces/statistics.interface';


export interface StatisticsDivProps extends DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement> {
	statistics: Statistics[],
}
