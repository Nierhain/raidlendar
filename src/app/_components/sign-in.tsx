"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
