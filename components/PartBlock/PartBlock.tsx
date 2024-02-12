import { PartBlockProps } from './PartBlock.props';
import styles from './PartBlock.module.css';
import { PhaseBlock } from '../PhaseBlock/PhaseBlock';
import { useEffect, useState } from 'react';
import { checkClient, getContainers, getStatistics, getUsers } from '../../helpers/admin.helper';
import { ContainersList } from '../ContainersList/ContainersList';
import { Container } from '../../interfaces/container.interface';
import { StatisticsDiv } from '../StatisticsDiv/StatisticsDiv';
import { Statistics } from '../../interfaces/statistics.interface';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { Htag } from 'components/Htag/Htag';
import cn from 'classnames';
import { User } from 'interfaces/user.interface';
import { UsersList } from 'components/UsersList/UsersList';


export const PartBlock = ({ part }: PartBlockProps): JSX.Element => {
    const router = useRouter();
    
    const [clientDomain, setClientDomain] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [clientSurname, setClientSurname] = useState<string>('');
    const [clientEmail, setClientEmail] = useState<string>('');
    const [clientPhone, setClientPhone] = useState<string>('');
    
    const [containers, setContainers] = useState<Container[]>([]);	
    const [statistics, setStatistics] = useState<Statistics[]>([]);
    const [users, setUsers] = useState<User[]>([]);	

    const [installLink, setInstallLink] = useState<string>('');

	useEffect(() => {
		getContainers(setContainers);
        getStatistics(setStatistics, router);
        getUsers(setUsers);
	}, [router]);
    
	if (part === 'one') {
        return (
            <div className={styles.wrapper}>
                <PhaseBlock>
                    <div className={styles.inputWrapper} data-title='yourdomain.kommo.com or yourdomain.amocrm.com'>
                        <Input type='text' text='subdomain.domain.com' value={clientDomain}
                            error={false} onChange={(e) => setClientDomain(e.target.value)} />
                    </div>
                    <Input type='text' text={setLocale(router.locale).client_name} value={clientName}
                        error={false} onChange={(e) => setClientName(e.target.value)} />
                    <Input type='text' text={setLocale(router.locale).client_surname} value={clientSurname}
                        error={false} onChange={(e) => setClientSurname(e.target.value)} />
                    <Input type='text' text='example@email.com' value={clientEmail}
                        error={false} onChange={(e) => setClientEmail(e.target.value)} />
                    <Input type='number' text='+55 55 5555 5555' value={clientPhone}
                        error={false} onChange={(e) => setClientPhone(e.target.value)} />
                    <Button text={setLocale(router.locale).go} isActive={true} isDone={false} 
                        onClick={() => checkClient(clientDomain, clientName, clientSurname, clientEmail, clientPhone, 
                            'container', router, setInstallLink)} />
                </PhaseBlock>
                <PhaseBlock>
                    <div className={styles.installLinkDiv}>
                        {
                            installLink ? 
                                <Htag tag='m' className={styles.installLink}>
                                    <a href={installLink} target='_blank' className={styles.installLink}>
                                        {installLink}
                                    </a>
                                </Htag>
                            :
                                <Htag tag='m' className={styles.installHtag}>
                                    {setLocale(router.locale).install_link_appear_here}
                                </Htag>
                        }
                        
                    </div>
                </PhaseBlock>
            </div>
        );
    } else if (part === 'two') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <ContainersList containers={containers} statistics={statistics} setContainers={setContainers} />
            </div>
        );
    } else if (part === 'three') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <StatisticsDiv statistics={statistics} />
            </div>
        );
    } else if (part === 'four') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <PhaseBlock>
                    <div className={styles.inputWrapper} data-title='yourdomain.kommo.com or yourdomain.amocrm.com'>
                        <Input type='text' text='subdomain.domain.com' value={clientDomain}
                            error={false} onChange={(e) => setClientDomain(e.target.value)} />
                    </div>
                    <Input type='text' text={setLocale(router.locale).client_name} value={clientName}
                        error={false} onChange={(e) => setClientName(e.target.value)} />
                    <Input type='text' text={setLocale(router.locale).client_surname} value={clientSurname}
                        error={false} onChange={(e) => setClientSurname(e.target.value)} />
                    <Input type='text' text='example@email.com' value={clientEmail}
                        error={false} onChange={(e) => setClientEmail(e.target.value)} />
                    <Input type='number' text='+55 55 5555 5555' value={clientPhone}
                        error={false} onChange={(e) => setClientPhone(e.target.value)} />
                    <Button text={setLocale(router.locale).go} isActive={true} isDone={false} 
                        onClick={() => checkClient(clientDomain, clientName, clientSurname, clientEmail, clientPhone, 
                            'client', router, setInstallLink)} />
                </PhaseBlock>
            </div>
        );
    } else if (part === 'five') {
        return (
            <div className={cn(styles.wrapper, styles.partTwoDiv)}>
                <UsersList users={users} setUsers={setUsers} />
            </div>
        );
    } else {
        return <></>;
    }
};