import NextAuth from 'next-auth';
import {OAuthConfig} from 'next-auth/providers';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import {compare} from 'bcryptjs';
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import prisma from './lib/prismadb';

export default NextAuth({
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		// Google Provider
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),

		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {label: 'email', type: 'text'},
				password: {label: 'Password', type: 'password'},
			},
			async authorize(credentials: any) {
				const user: any = await prisma.user.findFirst({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					throw new Error('No result Found with Email Please Sign Up...!');
				}

				const checkPassword = await compare(credentials.password, user.password);

				if (!checkPassword || user.email !== credentials.email) {
					throw new Error("name or Password doesn't match");
				}

				if (user) {
					return {...user, email: user.email};
				}
				return null;
			},
		}),
	],

	callbacks: {
		async jwt({token, user}) {
			return token;
		},
		async session({session, token}) {
			session.user = token;
			return session;
		},
	},
	secret: process.env.NEXT_AUTH_SECRET,
});
