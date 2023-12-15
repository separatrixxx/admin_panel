import { PartBlockProps } from './PartBlock.props';
import styles from './PartBlock.module.css';
import { PhaseBlock } from '../PhaseBlock/PhaseBlock';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import { checkPayment, getContainers, getStatistics, phaseOne, phaseThree, phaseTwo } from '../../helpers/admin.helper';
import { ContainersList } from '../ContainersList/ContainersList';
import { Container } from '../../interfaces/container.interface';
import cn from 'classnames';
import { StatisticsDiv } from '../StatisticsDiv/StatisticsDiv';
import { Statistics } from '../../interfaces/statistics.interface';
import { LoadingDots } from '../LoadingDots/LoadingDots';


export const PartBlock = ({ part, setIsPayment }: PartBlockProps): JSX.Element => {
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

    const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getContainers(setContainers);
        getStatistics(setStatistics);
	}, []);
    
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
                    <Button text='Go!' onClick={() => phaseOne(amoId, clientName, clientEmail, clientPhone,
                        setIsOpen, setUrl, setPaymentLink, setInstallLink)} />
                </PhaseBlock>
                <PhaseBlock phase={2}>
                    <Input type='text' text='client_id' value={clientId}
                        error={false} onChange={(e) => setClientId(e.target.value)} />
                    <Input type='text' text='client_secret' value={clientSecret}
                        error={false} onChange={(e) => setClientSecret(e.target.value)} />
                    {
                        !isLoading ?
                            <Button text='Go!' onClick={() => phaseTwo(clientId, clientSecret, setIsLoading)} />
                        :
                            <Button onClick={() => {}}>
                                <LoadingDots />
                            </Button>
                    }
                </PhaseBlock>
                <PhaseBlock phase={3}>
                    <Button text='Go!' onClick={() => phaseThree()} />
                </PhaseBlock>
                <div className={cn(styles.block, {
                        [styles.open]: !isOpen,
                    })}>
                        <a href={url} target='_blank'>{url}</a>
                        <a href={paymentLink} target='_blank'>{paymentLink}</a>
                        <a href={installLink.replace('XXX', clientId)} target='_blank'>
                            {installLink.replace('XXX', clientId)}
                        </a>
                        <Button text='Check Payment' onClick={() => checkPayment(setIsPayment)} />
                </div>
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