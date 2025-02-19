import { GetUser } from "@/api/UserData";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const getUserResult = await GetUser(
          credentials.email,
          credentials.password
        );

        if (getUserResult) return getUserResult;

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
