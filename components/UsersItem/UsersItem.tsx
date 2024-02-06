import { UsersItemProps } from './UsersItem.props';
import styles from './UsersItem.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { setLocale } from 'helpers/locale.helper';
import { Button } from 'components/Button/Button';
import { Htag } from 'components/Htag/Htag';
import { deleteUser, extendUser } from 'helpers/admin.helper';


export const UsersItem = ({ clientId, amoId, clientName, clName, clSurname, email, phone, stripeId,
    uuid, setUsers }: UsersItemProps): JSX.Element => {
    const router = useRouter();
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [paymentLink, setPaymentLink] = useState<string>('');
    
	return (
		<div className={styles.wrapper}>
            <div className={styles.usersDiv} onClick={() => setIsOpen(!isOpen)}>
                <Htag tag='s'>
                    {setLocale(router.locale).client_id + ': ' + clientId}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).amo_id + ': ' + amoId}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).domain + ': ' + clientName}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).client_name + ': ' + clName}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).client_surname + ': ' + clSurname}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).client_email + ': ' + email}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).client_phone + ': ' + phone}
                </Htag>
                <Htag tag='s'>
                    {'Stripe Id: ' + stripeId}
                </Htag>
                <Htag tag='s'>
                    {setLocale(router.locale).uuid + ': ' + uuid}
                </Htag>
            </div>
            {
                isOpen ? 
                    <div className={styles.usersButtons}>
                        <Button text={setLocale(router.locale).extend} isActive={true}
                            onClick={() => extendUser(uuid, setPaymentLink)} />
                        <Button text={setLocale(router.locale).delete} isActive={true}
                            onClick={() => deleteUser(uuid, setUsers, router)} />
                        {
                            paymentLink ?
                                <Htag tag='s' className={styles.paymentLinkDiv}>
                                    {paymentLink}
                                </Htag>
                            :
                                <></>
                        }
                    </div>
                :
                    <></>
            }
        </div>
	);
};
