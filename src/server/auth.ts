import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from 'next-auth';
import battlenet from "next-auth/providers/battlenet";
import { db } from "~/server/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [battlenet],
  adapter: DrizzleAdapter(db)
})