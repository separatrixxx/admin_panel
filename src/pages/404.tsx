import Head from 'next/head';
import { ErrorPage } from '../../page_components/ErrorPage/ErrorPage';


export default function PageNotFound() {
	return (
		<>
			<Head>
				<title>404</title>
				<meta name='description' content='Not Found' />
				<meta property='og:title' content='Not Found' />
				<meta property='og:description' content='Not Found' />
				<meta charSet="utf-8" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ErrorPage error={404} />
		</>
	);
}