import { NextComponentType, NextPage } from 'next';
import { AppProps } from 'next/app';

export type CustomAppProps = AppProps & {
	Component: NextComponentType & {
		auth?: boolean;
		role?: string;
	};
};
export type CustomNextPage<P = {}, IP = P> = NextPage<P, IP> & {
	auth?: boolean;
	role?: string;
};
