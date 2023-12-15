import { PartBlockProps } from './PartBlock.props';
import styles from './PartBlock.module.css';
import { PhaseBlock } from '../PhaseBlock/PhaseBlock';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import { checkPayment, getContainers, getStatistics, phaseOne, phaseThree } from '../../helpers/admin.helper';
import { ContainersList } from '../ContainersList/ContainersList';
import { Container } from '../../interfaces/container.interface';
import { StatisticsDiv } from '../StatisticsDiv/StatisticsDiv';
import { Statistics } from '../../interfaces/statistics.interface';
import { Htag } from '../Htag/Htag';
import { amoButton } from '../../helpers/amo.helper';
import cn from 'classnames';


export const PartBlock = ({ part }: PartBlockProps): JSX.Element => {
    const [amoId, setAmoId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [clientPhone, setClientPhone] = useState<string>('');
    
    const [clientId, setClientId] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [url, setUrl] = useState<string>('');
    const [paymentLink, setPaymentLink] = useState<string>('');
    const [installLink, setInstallLink] = useState<string>('');

    const [containers, setContainers] = useState<Container[]>([]);	
    const [statistics, setStatistics] = useState<Statistics[]>([]);

	useEffect(() => {
		getContainers(setContainers);
        getStatistics(setStatistics);
	}, []);

    const [isPayment, setIsPayment] = useState<boolean>(false);

    const [isActive1, setIsActive1] = useState<boolean>(true);
    const [isActive2, setIsActive2] = useState<boolean>(false);
    const [isActive3, setIsActive3] = useState<boolean>(false);
    
	if (part === 'one') {
        return (
            <div className={styles.wrapper}>
                <PhaseBlock phase={1}>
                    <Input type='number' text='amo_id' value={amoId}
                        error={false} onChange={(e) => setAmoId(e.target.value)} />
                    <Input type='text' text='client_name' value={clientName}
                        error={false} onChange={(e) => setClientName(e.target.value)} />
                    <Input type='text' text='client_email' value={clientEmail}
                        error={false} onChange={(e) => setClientEmail(e.target.value)} />
                    <Input type='number' text='client_phone' value={clientPhone}
                        error={false} onChange={(e) => setClientPhone(e.target.value)} />
                    <Button text='Go!' isActive={isActive1} onClick={() => {
                        if (isActive1) {
                            phaseOne(amoId, clientName, clientEmail, clientPhone,
                                setIsOpen, setUrl, setPaymentLink, setInstallLink, setIsActive1, setIsActive2)
                        }
                    }} />
                </PhaseBlock>
                <PhaseBlock phase={2}>
                    {
                        paymentLink ?
                            <a href={paymentLink} target='_blank' className={styles.link}>
                                <Htag tag='m'>
                                    {paymentLink}
                                </Htag>
                            </a>
                        :
                            <Htag tag='m' className={styles.linkText}>
                                A payment link will appear here
                            </Htag>
                    }
                    <Button  isActive={isActive2} text='Check Payment' onClick={() => {
                        if (isActive2) {
                            checkPayment(setIsPayment, setIsActive2, setIsActive3);
                        }
                    }} />
                </PhaseBlock>
                <PhaseBlock phase={3}>
                    <Button id='amocrm_oauth' text='Connect amo'  isActive={isActive3} onClick={() => {
                        // if (isActive3) {
                        //     if (isPayment) {
                        //         amoButton();
                        //     } else {
                        //         alert('Confirm payment first');
                        //     }
                        // }
                        amoButton();
                    }} />
                </PhaseBlock>
                {/* <div className={cn(styles.block, {
                        [styles.open]: isOpen,
                    })}>
                        <a href={url} target='_blank'>{url}</a>
                        <a href={installLink.replace('XXX', clientId)} target='_blank'>
                            {installLink.replace('XXX', clientId)}
                        </a>
                </div> */}
            </div>
        );
    } else if (part === 'two') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <ContainersList containers={containers} setContainers={setContainers} />
            </div>
        );
    } else if (part === 'three') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <StatisticsDiv statistics={statistics} />
            </div>
        );
    } else {
        return <></>;
    }
};