import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { User } from 'interfaces/user.interface';


export interface UsersListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	users: User[],
	setUsers: (e: any) => void,
}
