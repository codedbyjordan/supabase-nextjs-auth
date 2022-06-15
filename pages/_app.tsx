import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import AuthedProvider from "../components/AuthedProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthedProvider>
      <Component {...pageProps} />
    </AuthedProvider>
  );
}

export default MyApp;
