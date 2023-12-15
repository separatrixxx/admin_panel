import styles from './MainPage.module.css';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import { PartBlock } from '../../components/PartBlock/PartBlock';


export const MainPage = (): JSX.Element => {
    const [part, setPart] = useState<'one' | 'two' | 'three' | 'none'>('none');

    return (
        <div className={styles.wrapper}>
            <Button text='Part 1' isActive={true} onClick={() => {
                if (part !== 'one') { 
                    setPart('one');
                } else {
                    setPart('none');
                }
            }} />
            <Button text='Part 2' isActive={true} onClick={() => {
                if (part !== 'two') {
                    setPart('two');
                } else {
                    setPart('none');
                }
            }} />
            <Button text='Statistics' isActive={true} onClick={() => {
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