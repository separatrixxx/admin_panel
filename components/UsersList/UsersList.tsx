import { UsersListProps } from './UsersList.props';
import styles from './UsersList.module.css';
import { UsersItem } from '../UsersItem/UsersItem';


export const UsersList = ({ users, setUsers }: UsersListProps): JSX.Element => {
	return (
		<div className={styles.usersDiv}>
			{users.map(u => (
				<UsersItem key={u.uuid} clientId={u.client_id} amoId={u.amo_id} clientName={u.client_name}
                    clName={u.cl_name} clSurname={u.cl_surname} email={u.client_email} phone={u.client_phone} 
                    stripeId={u.stripe_id} uuid={u.uuid} setUsers={setUsers} />
			))}
		</div>
	);
};
