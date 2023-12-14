import { StatisticsDivProps } from './StatisticsDiv.props';
import styles from './StatisticsDiv.module.css';


export const StatisticsDiv = ({ statistics }: StatisticsDivProps): JSX.Element => {
	return (
		<table>
            <thead>
                <tr>
                    <th className={styles.th}>uuid</th>
                    <th className={styles.th}>status</th>
                    <th className={styles.th}>expire</th>
                    <th className={styles.th}>client</th>
                    <th className={styles.th}>application</th>
                    <th className={styles.th}>label</th>
                </tr>
            </thead>
            <tbody>
                {statistics.map(s => (
                    <tr key={s.uuid}>
                        <td className={styles.td}>
                            {s.uuid}
                        </td>
                        <td className={styles.td}>
                            {s.status}
                        </td>
                        <td className={styles.td}>
                            {s.expire}
                        </td>
                        <td className={styles.td}>
                            {s.client}
                        </td>
                        <td className={styles.td}>
                            {s.application}
                        </td>
                        <td className={styles.td}>
                            {s.label}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
	);
};
