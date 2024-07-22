import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      {session && session.user ? (
        <>
          <p>Welcome, {session.user.name}</p>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
