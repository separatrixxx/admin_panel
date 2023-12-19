import { ContainersItemProps } from './ContainersItem.props';
import styles from './ContainersItem.module.css';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { deleteContainer, downContainer, upContainer } from '../../helpers/admin.helper';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';


export const ContainersItem = ({ value, label, setContainers }: ContainersItemProps): JSX.Element => {
    const router = useRouter();
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
	return (
		<div className={styles.wrapper}>
            <div className={styles.containerDiv} onClick={() => setIsOpen(!isOpen)}>
                {label}
            </div>
            {
                isOpen ? 
                    <div className={styles.containerButtons}>
                        <Button text={setLocale(router.locale).up} isActive={true} onClick={() => upContainer(value, router)} />
                        <Button text={setLocale(router.locale).down} isActive={true} onClick={() => downContainer(value, router)} />
                        <Button text={setLocale(router.locale).delete} isActive={true} onClick={() => deleteContainer(value, setContainers, router)} />
                    </div>
                :
                    <></>
            }
        </div>
	);
};
