import Navbar from "./Navbar";

import classes from "./Layout.module.css";
import dynamic from "next/dynamic";

const DynamicFooter = dynamic(() => import("./Footer"));

const Layout = (props) => {
  return (
    <div className={classes.rooter}>
      <Navbar />
      <main className={classes.main}>
        <div className={classes.background}>{props.children}</div>
      </main>
      <DynamicFooter />
    </div>
  );
};

export default Layout;
