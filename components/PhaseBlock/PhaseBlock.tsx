import { PhaseBlockProps } from './PhaseBlock.props';
import styles from './PhaseBlock.module.css';
import { Htag } from '../Htag/Htag';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';


export const PhaseBlock = ({ phase, children }: PhaseBlockProps): JSX.Element => {
    const router = useRouter();
    
	return <div className={styles.phaseBlock}>
        <Htag tag='l' className={styles.title}>
            {setLocale(router.locale).phase + phase}
        </Htag>
        {children}
    </div>
};