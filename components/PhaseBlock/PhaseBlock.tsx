import { PhaseBlockProps } from './PhaseBlock.props';
import styles from './PhaseBlock.module.css';
import { Htag } from '../Htag/Htag';


export const PhaseBlock = ({ phase, children }: PhaseBlockProps): JSX.Element => {
	return <div className={styles.phaseBlock}>
        <Htag tag='l' className={styles.title}>
            {'Phase ' + phase}
        </Htag>
        {children}
    </div>
};