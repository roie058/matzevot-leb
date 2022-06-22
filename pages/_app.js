import "../styles/globals.css";

import Layout from "../components/layout/Layout";
import { AuthContext } from "../lib/context/auth-context";
import { useAuth } from "../lib/hooks/auth-hook";
function MyApp({ Component, pageProps }) {
  const { login, logout, isAdmin, userId, token } = useAuth();
  return (
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
  );
}

export default MyApp;
