import styles from './MainPage.module.css';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { PartBlock } from '../../components/PartBlock/PartBlock';


export const MainPage = (): JSX.Element => {
    const [part, setPart] = useState<'one' | 'two' | 'three' | 'none'>('none');
    const [isPayment, setIsPayment] = useState<boolean>(false);

    return (
        <div className={styles.wrapper}>
            <Button text='Part 1' onClick={() => {
                if (part !== 'one') { 
                    setPart('one');
                } else {
                    setPart('none');
                }
            }} />
            <Button text='Part 2' onClick={() => {
                if (part !== 'two') {
                    if (isPayment) {
                        setPart('two');
                    } else {
                        alert('Confirm payment first');
                    }
                } else {
                    setPart('none');
                }
            }} />
            <Button text='Statistics' onClick={() => {
                if (part !== 'three') { 
                    setPart('three');
                } else {
                    setPart('none');
                }
            }} />
            <PartBlock part={part} setIsPayment={setIsPayment} />
        </div>
    );
};