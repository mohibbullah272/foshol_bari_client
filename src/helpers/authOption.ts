import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      phone?: string | null;
      role?: string | null;
      status?:string | null;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    phone?: string | null;
    role?: string | null;
    status?:string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    phone?: string | null;
    status?:string | null;
    role?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials.password) {
          console.error("phone or Password is missing");
          return null;
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phone: credentials.phone,
                password: credentials.password,
              }),
            }
          );
          
          console.log("Response From Backend:", res);
          if (!res?.ok) {
            console.error("Login Failed", await res.text());
            return null;
          }

          const user = await res.json();
  
          
          if (user.data.id) {
            return {
              id: user.data.id,
              name: user.data.name,
              phone: user.data.phone,
              role: user.data.role,
              status:user.data.status
            };
          } else {
            return null;
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist all user data to the token on initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phone = user.phone;
        token.role = user.role;
        token.status=user.status
      }
      return token;
    },
    async session({ session, token }) {
      // Send all user properties to the client
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.phone = token.phone;
        session.user.role = token.role;
        session.user.status=token.status
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};