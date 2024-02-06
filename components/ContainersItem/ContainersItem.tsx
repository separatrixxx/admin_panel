import { ContainersItemProps } from './ContainersItem.props';
import styles from './ContainersItem.module.css';
import { useState } from 'react';
import { deleteContainer, downContainer, upContainer } from '../../helpers/admin.helper';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { Button } from 'components/Button/Button';
import { Htag } from 'components/Htag/Htag';


export const ContainersItem = ({ value, label, statistics, setContainers }: ContainersItemProps): JSX.Element => {
    const router = useRouter();
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    let status: string = '';
    let expire: string = '';

    for (let stat of statistics) {
        if (stat.uuid === value) {
            status = stat.status;
            expire = stat.expire;

            break;
        }
    }
    
	return (
		<div className={styles.wrapper}>
            <div className={styles.containerDiv} onClick={() => setIsOpen(!isOpen)}>
                <Htag tag='s'>
                    {label}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).uuid + ': ' + value}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).status + ': ' + status}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).expire + ': ' + expire}
                </Htag>
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
