import { ContainersListProps } from './ContainersList.props';
import styles from './ContainersList.module.css';
import { ContainersItem } from '../ContainersItem/ContainersItem';


export const ContainersList = ({ containers, statistics, setContainers }: ContainersListProps): JSX.Element => {
	return (
		<div className={styles.containersDiv}>
			{containers.map(c => (
				<ContainersItem key={c.value} value={c.value} label={c.label} statistics={statistics}
					setContainers={setContainers} />
			))}
		</div>
	);
};
