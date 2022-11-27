import {getSession} from 'next-auth/react';
import Link from 'next/link';

export default () => {
	return (
		<section className="container max-auto text-center">
			<h3 className="text-4xl font-bold">Profile Page</h3>

			<Link href={'/'}> Home Page</Link>
		</section>
	);
};

export async function getServerSideProps({req: any}) {
	const session = await getSession({req: any});

	if (!session) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	return {
		props: {session},
	};
}
