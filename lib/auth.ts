import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

let userIdCounter = 1;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          label: '이메일',
          type: 'email',
          placeholder: 'example@example.com',
        },
        passwd: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.passwd)
          return null;

        console.log('🚀  credentials:', credentials);
        const { email } = credentials;
        const user = {
          id: String(userIdCounter++),
          email: email,
        } as User;
        return user;
      },
    }),
    Google,
    GitHub,
  ],
  callbacks: {
    session({ session }) {
      console.log('session');
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  trustHost: true,
});
