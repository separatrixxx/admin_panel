import { PartBlockProps } from './PartBlock.props';
import styles from './PartBlock.module.css';
import { PhaseBlock } from '../PhaseBlock/PhaseBlock';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useEffect, useState } from 'react';
import { checkPayment, getContainers, getStatistics, phaseOne } from '../../helpers/admin.helper';
import { ContainersList } from '../ContainersList/ContainersList';
import { Container } from '../../interfaces/container.interface';
import { StatisticsDiv } from '../StatisticsDiv/StatisticsDiv';
import { Statistics } from '../../interfaces/statistics.interface';
import { amoButton } from '../../helpers/amo.helper';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import cn from 'classnames';


export const PartBlock = ({ part }: PartBlockProps): JSX.Element => {
    const router = useRouter();
    
    const [amoId, setAmoId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [clientPhone, setClientPhone] = useState<string>('');
    
    const [containers, setContainers] = useState<Container[]>([]);	
    const [statistics, setStatistics] = useState<Statistics[]>([]);

    const [isPayment, setIsPayment] = useState<boolean>(true);

	useEffect(() => {
        checkPayment(router.query.uuid, setIsPayment)
		getContainers(setContainers);
        getStatistics(setStatistics, router);
	}, [router]);
    
	if (part === 'one') {
        return (
            <div className={styles.wrapper}>
                <PhaseBlock phase={1}>
                    <Input type='number' text={setLocale(router.locale).amo_id} value={amoId}
                        error={false} onChange={(e) => setAmoId(e.target.value)} />
                    <Input type='text' text={setLocale(router.locale).client_name} value={clientName}
                        error={false} onChange={(e) => setClientName(e.target.value)} />
                    <Input type='text' text={setLocale(router.locale).client_email} value={clientEmail}
                        error={false} onChange={(e) => setClientEmail(e.target.value)} />
                    <Input type='number' text={setLocale(router.locale).client_phone} value={clientPhone}
                        error={false} onChange={(e) => setClientPhone(e.target.value)} />
                    <Button text={
                        !isPayment ? setLocale(router.locale).go + '!' : setLocale(router.locale).done
                    } isActive={true} isDone={isPayment} onClick={() => {
                        if (!isPayment) {
                            phaseOne(amoId, clientName, clientEmail, clientPhone, router);
                        }
                    }} />
                </PhaseBlock>
                <PhaseBlock phase={2}>
                    <Button id='amocrm_oauth' text={setLocale(router.locale).connect_amo} isActive={isPayment} onClick={() => {
                        if (isPayment && typeof router.query.uuid === 'string') {
                            amoButton(router.query.uuid, router);
                        } else {
                            alert(setLocale(router.locale).confirm_payment_first);
                        }
                    }} />
                </PhaseBlock>
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