import { ErrorPageProps } from "./ErrorPage.props";
import styles from './ErrorPage.module.css';
import Link from "next/link";
import { useRouter } from "next/router";
import { Htag } from "../../components/Htag/Htag";


export const ErrorPage = ({ error }: ErrorPageProps): JSX.Element => {
    const router = useRouter();

    let errorText = "";

    if (error === 404) {
        errorText = 'Error 404';
    } else {
        errorText = 'Error 500';
    }

    return (
        <div className={styles.errorPage}>
            <Link href='/'>
                <Htag tag="l" className={styles.errorText}>
                    {errorText}
                </Htag>
            </Link>
        </div>
    );
};