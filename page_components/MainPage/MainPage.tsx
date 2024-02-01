import styles from './MainPage.module.css';
import { useEffect, useState } from 'react';
import { PartBlock } from '../../components/PartBlock/PartBlock';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { Header } from 'components/Header/Header';
import Image from 'next/image';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';



export const MainPage = (): JSX.Element => {
    const router = useRouter();

    const [part, setPart] = useState<'one' | 'two' | 'three' | 'none'>('none');

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');

    const pass: string = '@1NWgoVwN4zFsd7S#S';

    useEffect(() => {
		const isLog = sessionStorage.getItem('isLogged');

        if (isLog) {
            setIsLogged(true);
        }
	}, [router]);

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.imageBlock}>
                <Image className={styles.img} draggable='false'
                    loader={() => '/bg.png'}
                    src='/bg.png'
                    alt='bg img'
                    width={1}
                    height={1}
                    unoptimized={true}
                />
            </div>
            {
                isLogged ?
                    <div className={styles.mainBlock}>
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
                :
                    <div className={styles.mainBlock}>
                        <Input type='text' text={setLocale(router.locale).password} value={password}
                            error={false} onChange={(e) => setPassword(e.target.value)} />
                        <Button text={setLocale(router.locale).log_in} isActive={true} isDone={false} 
                            onClick={() => {
                                if (password === pass) {
                                    setIsLogged(true);
                                    sessionStorage.setItem('isLogged', 'true');
                                } else {
                                    alert(setLocale(router.locale).wrong_password)
                                }
                            }} />
                    </div>
            }
        </div>
    );
};