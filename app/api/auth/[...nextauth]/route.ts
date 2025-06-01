import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Hardcoded admin credentials for MVP
        // In production, this should be stored in database
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@psycholodzy-platform.pl';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials.email === adminEmail) {
          const isValidPassword = await bcrypt.compare(credentials.password, await bcrypt.hash(adminPassword, 10));
          
          if (isValidPassword || credentials.password === adminPassword) {
            return {
              id: '1',
              email: adminEmail,
              name: 'Administrator',
              role: 'admin'
            };
          }
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub || '1';
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login'
  },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST }; 