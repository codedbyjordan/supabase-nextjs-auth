import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { AuthedContext } from "./AuthedProvider";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authState = useContext(AuthedContext);
  const { push } = useRouter();

  useEffect(() => {
    if (authState !== "loading" && authState !== "authenticated") push("/");
  }, [authState]);

  return <div>{authState === "authenticated" && children}</div>;
};

export default ProtectedRoute;
