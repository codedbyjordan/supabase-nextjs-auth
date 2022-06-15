import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { AuthedContext } from "../components/AuthedProvider";
import { supabase } from "../utils/supabase";

const Home: NextPage = () => {
  const authState = useContext(AuthedContext);

  return (
    <div>
      {authState == "authenticated" ? (
        <button onClick={() => supabase.auth.signOut()}>Logout</button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default Home;
