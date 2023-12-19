import styles from './LocaleChange.module.css';
import { Htag } from 'components/Htag/Htag';
import { setLocale } from 'helpers/locale.helper';
import Link from 'next/link';
import { useRouter } from 'next/router';


export const LocaleChange = (): JSX.Element => {
    const router = useRouter();
    
	return <Link href={router.asPath} locale={router.locale === 'en' ? 'pt' : 'en'}>
        <Htag tag='m' className={styles.localeChange}>
            {setLocale(router.locale).language}
        </Htag>
    </Link>
    };
