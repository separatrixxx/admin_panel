import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface UsersItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	clientId: number,
    amoId: number,
	clientName: string,
    clName: string,
    clSurname: string,
    email: string,
    phone: string,
    stripeId: string,
    uuid: string,
    setUsers: (e: any) => void,
}
