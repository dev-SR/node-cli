import { Button, Center, Group, Stack, Title, Text, TextInput, Box } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import React from 'react';
import { FaGoogle } from 'react-icons/fa';
type Inputs = {
	email: string;
	password: string;
};
const Signin = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<Inputs>();
	const onSubmit = (data: Inputs) =>
		signIn('credentials', {
			...data,
			// The page where you want to redirect to after a
			// successful login
			callbackUrl: `/`
		});

	return (
		<div>
			<Center
				sx={{
					width: '100%',
					height: '100vh'
				}}>
				<Stack spacing='xl'>
					<Title align='center'>Sign in</Title>
					<Button onClick={() => signIn('google')} size='lg' sx={{ alignSelf: 'center' }}>
						<Group>
							<Text size='md'>Sign in with Google</Text>
							<FaGoogle />
						</Group>
					</Button>
				</Stack>
			</Center>
		</div>
	);
};

export default Signin;
