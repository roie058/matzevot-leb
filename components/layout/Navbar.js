import styles from "./Navbar.module.css";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { useHttp } from "../../lib/hooks/http-hook";
import { AuthContext } from "../../lib/context/auth-context";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import { NavLink } from "./NavLink";

const Navbar = () => {
  const { error, isLoading, clearError, sendRequest } = useHttp();
  const [toggleNav, setToggleNav] = useState(false);
  const [mesNum, setMesNum] = useState(0);
  const [revNum, setRevNum] = useState(0);
  const [toggleDevNav, setToggleDevNav] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const messages = await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/messages"
        );
        setMesNum(messages.messages.length);
      } catch (err) {}
    };

    const fetchRev = async () => {
      try {
        const reviews = await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews"
        );
        setRevNum(reviews.reviews.length);
      } catch (err) {}
    };
    if (authCtx.isAdmin) {
      fetch();
      fetchRev();
    }
  }, [sendRequest, authCtx]);

  const burgerClick = () => {
    setToggleNav(!toggleNav);
    setToggleDevNav(false);
  };

  const burgerDevClick = () => {
    setToggleDevNav(!toggleDevNav);
    setToggleNav(false);
  };

  return (
    <header className={styles.head}>
      <ErrorModal error={error} onClear={clearError} />
      <nav className={styles.header}>
        <Link href={"/"}>
          <a className={styles.logo}>מצבות ליבוביץ</a>
        </Link>
        <ul
          className={toggleNav ? styles.nav_active : ""}
          onClick={toggleNav ? burgerClick : () => {}}
        >
          <li className={toggleNav ? styles.li_active : ""}>
            <NavLink className="" exact href="/">
              דף הבית
            </NavLink>
          </li>
          <li className={toggleNav ? styles.li_active : ""}>
            <NavLink href="/catalog" className="" exact>
              קטלוג מצבות
            </NavLink>
          </li>
          <li className={toggleNav ? styles.li_active : ""}>
            <NavLink className="" exact href="/marbles">
              סוגי שיש
            </NavLink>
          </li>
          <li className={toggleNav ? styles.li_active : ""}>
            <NavLink className="" exact href="/wording">
              סוגי אותיות ונוסחים
            </NavLink>
          </li>

          <li className={toggleNav ? styles.li_active : ""}>
            <NavLink className="" exact href="/contact">
              צרו קשר
            </NavLink>
          </li>
        </ul>
        {authCtx.isLoggedIn && <Button onClick={authCtx.logout}>התנתק</Button>}
        <div className={styles.burger} onClick={burgerClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </nav>
      {authCtx.isAdmin && !isLoading && (
        <nav className={`${styles.header} ${styles.header_log}`}>
          <ul
            className={toggleDevNav ? styles.nav_active : ""}
            onClick={toggleDevNav ? burgerDevClick : () => {}}
          >
            <li className={toggleDevNav ? styles.li_active : ""}>
              <NavLink className="" exact href="/newcat">
                הוסף לקטלוג
              </NavLink>
            </li>
            <li className={toggleDevNav ? styles.li_active : ""}>
              <NavLink className="" exact href="/messeges">
                הודעות
                <span className={styles.counter}>{mesNum}</span>
              </NavLink>
            </li>
            <li className={toggleDevNav ? styles.li_active : ""}>
              <NavLink className="" exact href="/all-articles">
                מאמרים
              </NavLink>
            </li>
            <li className={toggleDevNav ? styles.li_active : ""}>
              <NavLink className="" exact href="/alarts">
                הוסף התראות
              </NavLink>
            </li>

            <li className={toggleDevNav ? styles.li_active : ""}>
              <NavLink className="" exact href="/reviews">
                <span className={styles.counter}>{revNum}</span>
                ביקורות
              </NavLink>
            </li>
          </ul>
          <div className={styles.burger} onClick={burgerDevClick}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
