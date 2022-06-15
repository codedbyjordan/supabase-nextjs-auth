import { GetServerSideProps, NextPage } from "next";
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { supabase } from "../utils/supabase";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/login" } };
  } else {
    return { props: { user } };
  }
};

const Profile: NextPage<{ user: any }> = ({ user }) => {
  return (
    <ProtectedRoute>
      <h1>Email: {user.email}</h1>
    </ProtectedRoute>
  );
};

export default Profile;
