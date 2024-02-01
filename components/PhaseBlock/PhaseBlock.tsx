import { PhaseBlockProps } from './PhaseBlock.props';
import styles from './PhaseBlock.module.css';
import { useRouter } from 'next/router';


export const PhaseBlock = ({ children }: PhaseBlockProps): JSX.Element => {
	return <div className={styles.phaseBlock}>
        {children}
    </div>
};