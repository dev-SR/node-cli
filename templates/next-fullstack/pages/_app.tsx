import '../styles/globals.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme, Center, Loader } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CustomAppProps } from '@libs/types/CustomNextType';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function MyApp(props: CustomAppProps) {
	const {
		Component,
		pageProps: { session, ...pageProps }
	} = props;

	// https://mantine.dev/guides/dark-theme/
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true
	});
	const toggleColorScheme = (value?: ColorScheme) => {
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	};
	const [queryClient] = useState(() => new QueryClient());

	return (
		<>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider
					theme={{ colorScheme: colorScheme, fontFamily: 'Inter, sans-serif' }}
					withGlobalStyles
					withNormalizeCSS>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<SessionProvider session={session}>
								{Component.auth ? (
									<AuthGuard role={Component.role}>
										<Component {...pageProps} />
									</AuthGuard>
								) : (
									<Component {...pageProps} />
								)}
								|
							</SessionProvider>
							<ReactQueryDevtools initialIsOpen={false} />
						</Hydrate>
					</QueryClientProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
const AuthGuard = ({
	children,
	role
}: {
	children: React.ReactNode;
	role: string | undefined;
}): any => {
	const { data, status } = useSession();
	console.log(role, data);

	const router = useRouter();
	useEffect(() => {
		if (status === 'unauthenticated')
			if (router.pathname !== '/auth/signin') router.push('/auth/signin');
	}, [data, status]);
	if (status === 'loading') {
		return (
			<Center
				sx={{
					height: '100vh',
					width: '100vw'
				}}>
				<Loader size={'lg'} />
			</Center>
		);
	}
	if (status === 'authenticated') {
		if (role) {
			if (data?.user?.role === role) return children;
			else
				return (
					<Center
						sx={{
							height: '100vh',
							width: '100vw'
						}}>
						<h1>Not Authorized</h1>
					</Center>
				);
		}
		return children;
	}
};

export default MyApp;
