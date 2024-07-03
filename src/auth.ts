import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from 'next-auth';
import battlenet from "next-auth/providers/battlenet";
import { db } from "~/server/db";
import { env } from "./env";
import { accounts, authenticators, sessions, users, verificationTokens } from "./server/db/schema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [battlenet({
    clientId: env.AUTH_BATTLENET_ID,
    clientSecret: env.AUTH_BATTLENET_SECRET,
    issuer: env.AUTH_BATTLENET_ISSUER,
  })],
  adapter: DrizzleAdapter(db, {
    accountsTable: accounts,
    usersTable: users,
    authenticatorsTable: authenticators,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  })
})