import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { supabase } from "../utils/supabase";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/profile" } };
  } else {
    return { props: {} };
  }
};

const Login: NextPage = () => {
  return (
    <div>
      <button onClick={() => supabase.auth.signIn({ provider: "google" })}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
