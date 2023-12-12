import styles from './MainPage.module.css';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { phaseOne, phaseThree, phaseTwo } from '../../helpers/admin.helper';
import { useState } from 'react';
import { PhaseBlock } from '../../components/PhaseBlock/PhaseBlock';
import cn from 'classnames';


export const MainPage = (): JSX.Element => {
    // const router = useRouter();

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
                <div className={cn(styles.block, {
                    [styles.open]: isOpen,
                })}>
                    <a href={url} target='_blank'>{url}</a>
                    <a href={paymentLink} target='_blank'>{paymentLink}</a>
                    <a href={installLink.replace('XXX', clientId)} target='_blank'>
                        {installLink.replace('XXX', clientId)}
                    </a>
                </div>
            </PhaseBlock>
            <PhaseBlock phase={2}>
                <Input type='text' text='client_id' value={clientId}
                    error={false} onChange={(e) => setClientId(e.target.value)} />
                <Input type='text' text='client_secret' value={clientSecret}
                    error={false} onChange={(e) => setClientSecret(e.target.value)} />
                <Button text='Go!' onClick={() => phaseTwo(clientId, clientSecret)} />
            </PhaseBlock>
            <PhaseBlock phase={3}>
                <Button text='Go!' onClick={() => phaseThree()} />
            </PhaseBlock>
        </div>
    );
};