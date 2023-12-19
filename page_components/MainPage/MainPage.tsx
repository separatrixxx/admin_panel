import styles from './MainPage.module.css';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { PartBlock } from '../../components/PartBlock/PartBlock';
import { LocaleChange } from 'components/LocaleChange/LocaleChange';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';


export const MainPage = (): JSX.Element => {
    const router = useRouter();

    const [part, setPart] = useState<'one' | 'two' | 'three' | 'none'>('none');

    return (
        <div className={styles.wrapper}>
            <LocaleChange />
            <Button text={setLocale(router.locale).part + ' 1'} isActive={true} onClick={() => {
                if (part !== 'one') { 
                    setPart('one');
                } else {
                    setPart('none');
                }
            }} />
            <Button text={setLocale(router.locale).part + ' 2'} isActive={true} onClick={() => {
                if (part !== 'two') {
                    setPart('two');
                } else {
                    setPart('none');
                }
            }} />
            <Button text={setLocale(router.locale).statistics} isActive={true} onClick={() => {
                if (part !== 'three') { 
                    setPart('three');
                } else {
                    setPart('none');
                }
            }} />
            <PartBlock part={part} />
        </div>
    );
};