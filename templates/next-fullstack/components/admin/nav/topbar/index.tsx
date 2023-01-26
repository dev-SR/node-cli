import { Burger, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export const TopBar = ({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) => {
	const theme = useMantineTheme();
	return (
		<Header height={70} p='md'>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%'
				}}>
				{/* at sm */}
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={open}
						onClick={() => setOpen(!open)}
						size='md'
						color={theme.colors.gray[7]}
					/>
				</MediaQuery>
				<Link
					href={'/'}
					style={{
						textDecoration: 'none'
					}}>
					<Text
						size='xl'
						weight={700}
						color={theme.colorScheme == 'dark' ? theme.colors.gray[3] : theme.colors.dark[9]}>
						Next.js + Mantine
					</Text>
				</Link>
			</div>
		</Header>
	);
};
