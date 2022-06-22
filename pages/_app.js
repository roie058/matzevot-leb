import "../styles/globals.css";

import Layout from "../components/layout/Layout";
import { AuthContext } from "../lib/context/auth-context";
import { useAuth } from "../lib/hooks/auth-hook";
import { Fragment } from "react";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const { login, logout, isAdmin, userId, token } = useAuth();
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/logo.jpg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no"
        />

        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content=" מצבות ליבוביץ
      
        מצבות ואנדרטאות בכל רחבי הארץ
        
        ! שמים את השירות והאמינות מעל הכל
        
        עסק משפחתי שמתמחה בתחום כבר למעלה מ40 שנה
     "
        />
        <link rel="apple-touch-icon" href="/logo.jpg" />

        <link rel="manifest" href="/manifest.json" />

        <title>מצבות ליבוביץ</title>
      </Head>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          isAdmin: isAdmin,
          login: login,
          logout: logout,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default MyApp;
