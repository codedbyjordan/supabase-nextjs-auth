import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const AuthedContext = React.createContext("");

const AuthedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState("loading");

  const checkUser = () => {
    const user = supabase.auth.user();
    if (user) {
      setAuthState("authenticated");
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });

        if (event === "SIGNED_IN") {
          setAuthState("authenticated");
        } else if (event === "SIGNED_OUT") {
          setAuthState("unauthenticated");
        }
      }
    );

    checkUser();

    return () => authListener?.unsubscribe();
  }, []);

  return (
    <AuthedContext.Provider value={authState}>
      {children}
    </AuthedContext.Provider>
  );
};

export default AuthedProvider;
