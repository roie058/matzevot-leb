import { Fragment, useState, useEffect } from "react";
import styles from "./infiniteSlider.module.css";

let Screenwidth;
const InfiniteSlider = (props) => {
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  const [width, setWidth] = useState(Screenwidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 860;

  return (
    <Fragment>
      <h2>הודעות חשובות</h2>
      {!isMobile && (
        <div className={styles.body}>
          <div className={styles.slider}>
            <div className={styles.slide_track}>
              {props.alarts.map((alart) => (
                <div key={alart.id} className={styles.slide}>
                  <h4 className={styles.text}>{alart.description}</h4>
                </div>
              ))}
              {props.alarts.map((alart) => (
                <div key={alart.id} className={styles.slide}>
                  <h4 className={styles.text}>{alart.description}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.body}>
          {props.alarts.map((alart) => (
            <div key={alart.id} className={styles.list}>
              <h4 className={styles.text}>{alart.description}</h4>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default InfiniteSlider;
