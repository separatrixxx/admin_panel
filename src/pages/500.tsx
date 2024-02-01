import Head from 'next/head';
import { ErrorPage } from '../../page_components/ErrorPage/ErrorPage';


export default function PageServerFailure() {
	return (
		<>
			<Head>
				<title>500</title>
				<meta name='description' content=' Server Failure' />
				<meta property='og:title' content='Server Failure' />
				<meta property='og:description' content='Server Failure' />
				<meta charSet="utf-8" />
				<link rel="icon" href="/logo.png" />
			</Head>
			<ErrorPage error={500} />
		</>
	);
}