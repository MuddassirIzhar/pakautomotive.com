
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";
import { cookies } from 'next/headers'
import { LOGIN_ROUTE } from "@/utils/ApiRoutes";

// export const authOptions: AuthOptions = {
const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID as string,
        //     clientSecret: process.env.GOOGLE_SECRET as string,
        // }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const cookieStore = await cookies();
                    const res : any = await axiosInstance.post(LOGIN_ROUTE, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    const result = {
                        id: res.data.user.id,
                        firstName: res.data.user.firstName,
                        lastName: res.data.user.lastName,
                        name: res.data.user.firstName + " " + res.data.user.lastName,
                        email: res.data.user.email,
                        image: res.data.user.avatar,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        role: {
                            id:1,
                            name:'Admin',
                            permissions:[]
                        }
                    }
                    cookieStore.set({
                        name: 'refreshToken',
                        value: result.refreshToken,
                        httpOnly: true,
                    })
                    // cookies().set({
                    //     name: 'refreshToken',
                    //     value: result.refreshToken,
                    //     httpOnly: true,
                    // })
                    return result;
                } catch (error: any) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.data?.errors?.length > 0) {
                            throw new Error(error.response?.data?.errors[0]);
                        }
                        throw new Error(error.response?.data.message);
                    } else {
                        throw new Error(error.message);
                    }
                }
            },
        }),
    ],
    callbacks: {
        // async jwt({ token, user }) {
        //     return { ...token, ...user };
        // },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                const data = session.data;
                const updatedData = {
                    id: data.user.id,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    name: data.user.firstName + " " + data.user.lastName,
                    email: data.user.email,
                    image: data.user.avatar,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }
                token = updatedData
                return token;
            }
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };