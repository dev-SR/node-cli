import { Button, Text } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import AdminLayout from '@ui/admin/layout';
import { CustomNextPage } from '@libs/types/CustomNextType';
const Home: CustomNextPage = () => {
	const { data, status } = useSession();
	return (
		<AdminLayout>
			<div>
				{data?.user?.name || <Link href='/auth/signin'>Sign in</Link>}
				{status === 'loading' && <Text>Loading...</Text>}
				{status === 'authenticated' && <Button onClick={() => signOut()}>SIGN OUT</Button>}
			</div>
		</AdminLayout>
	);
};
Home.auth = true;
Home.role = 'admin';
export default Home;
