import styles from './Header.module.css';
import { LocaleChange } from 'components/LocaleChange/LocaleChange';
import Logo from './logo.svg';
import { Htag } from 'components/Htag/Htag';


export const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <Htag tag='m' className={styles.logo}>
                <Logo />
            </Htag>
            <LocaleChange />
        </header>
    );
};