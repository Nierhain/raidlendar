import Navigation from "./_components/navigation";
import SignIn from "./_components/sign-in";

export default async function Home() {
  return (
    <main className="flex h-screen w-screen">
      <Navigation />
      <div className="flex flex-col grow items-center justify-center gap-12 px-4 py-16 ">
        <SignIn />
      </div>
    </main>
  );
}
