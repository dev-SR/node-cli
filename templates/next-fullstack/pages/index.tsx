import { Text } from '@mantine/core';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FaMoon, FaSun } from 'react-icons/fa';
import { classnames } from '@libs/classnames';
import Link from 'next/link';
import { prisma } from '@libs/prisma';
import { useSession } from 'next-auth/react';
export default function Home() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const { data, status } = useSession();
	console.log(data);
	return (
		<div className='flex flex-col h-screen justify-center items-center'>
			<ActionIcon
				color={dark ? 'yellow' : 'blue'}
				onClick={() => toggleColorScheme()}
				className='h-10 w-10'
				title='Toggle color scheme'>
				{dark ? <FaSun className='h-8 w-8' /> : <FaMoon className='h-8 w-8' />}
			</ActionIcon>
			<Link href={'/admin'}>
				<Text
					className={classnames('font-normal text-4xl ', dark ? 'text-blue-200' : 'text-blue-800')}>
					Admin
				</Text>
			</Link>
		</div>
	);
}
