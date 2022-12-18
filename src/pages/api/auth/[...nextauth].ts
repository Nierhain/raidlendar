import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import BattleNetProvider from "next-auth/providers/battlenet"

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    BattleNetProvider({
      clientId: env.BATTLENET_CLIENT_ID,
      clientSecret: env.BATTLENET_CLIENT_SECRET,
      issuer: "https://eu.battle.net/oauth"
    })
  ],
};

export default NextAuth(authOptions);
