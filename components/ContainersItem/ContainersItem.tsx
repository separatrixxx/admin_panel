import { ContainersItemProps } from './ContainersItem.props';
import styles from './ContainersItem.module.css';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { deleteContainer, downContainer, upContainer } from '../../helpers/admin.helper';


export const ContainersItem = ({ value, label, setContainers }: ContainersItemProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
	return (
		<div className={styles.wrapper}>
            <div className={styles.containerDiv} onClick={() => setIsOpen(!isOpen)}>
                {label}
            </div>
            {
                isOpen ? 
                    <div className={styles.containerButtons}>
                        <Button text='UP' isActive={true} onClick={() => upContainer(value)} />
                        <Button text='DOWN' isActive={true} onClick={() => downContainer(value)} />
                        <Button text='DELETE' isActive={true} onClick={() => deleteContainer(value, setContainers)} />
                    </div>
                :
                    <></>
            }
        </div>
	);
};
