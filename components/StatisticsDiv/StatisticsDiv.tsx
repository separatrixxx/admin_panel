import { StatisticsDivProps } from './StatisticsDiv.props';
import styles from './StatisticsDiv.module.css';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';


export const StatisticsDiv = ({ statistics }: StatisticsDivProps): JSX.Element => {
    const router = useRouter();
    
	return (
		<table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>{setLocale(router.locale).uuid}</th>
                    <th className={styles.th}>{setLocale(router.locale).status}</th>
                    <th className={styles.th}>{setLocale(router.locale).expire}</th>
                    <th className={styles.th}>{setLocale(router.locale).client}</th>
                    <th className={styles.th}>{setLocale(router.locale).application}</th>
                    <th className={styles.th}>{setLocale(router.locale).label}</th>
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
