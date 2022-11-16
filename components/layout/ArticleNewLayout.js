import ArticleItem from "./ArticleItem";
import styles from "./ArticleNewLayout.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ErrorModal from "../../components/UI/ErrorModal";

import { Fragment, useState, useEffect } from "react";

let Screenwidth;

const headArticles = [
  {
    headImage: "/black-granite.jpg",
    header: "קטלוג מצבות",
    address: "/catalog",
    button: "לקטלוג",
    id: "area2",
  },
  {
    headImage: "/bronza.jpg",
    header: "סוגי אותיות",
    address: "/wording",
    button: "לצפייה",
    id: "area3",
  },

  {
    headImage: "/turkish-marble.webp",
    header: "סוג השיש",
    address: "/marbles",
    button: "לצפייה",
    id: "area1",
  },
];

const ArticleNewLayout = (props) => {
  if (typeof window !== "undefined") {
    width = window.innerWidth;
  }
  const [width, setWidth] = useState(Screenwidth);
  const [current, setCurrent] = useState(0);
  const loadedArticles = props.loadedArticles;
  const allArticles = headArticles.concat(loadedArticles);
  const [isArtcles, setIsArticles] = useState(false);
  const isMobile = width <= 800;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);

    if (isMobile) {
      const timer = setTimeout(() => {
        if (current == allArticles.length - 1) {
          setCurrent(0);
        } else {
          setCurrent(current + 1);
        }
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [current]);

  const onArrowClick = (e) => {
    e.preventDefault();
    setIsArticles(!isArtcles);
  };

  const onArrowClickLeft = (e) => {
    e.preventDefault();
    if (current == 0) {
      setCurrent(allArticles.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const onArrowClickRight = (e) => {
    e.preventDefault();
    if (current == allArticles.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={props.error} onClear={props.clearError} />

      {loadedArticles && !isMobile && (
        <section className={styles.board}>
          {isArtcles && (
            <div className={styles.container2}>
              {loadedArticles.map((article) => {
                return (
                  <ArticleItem
                    className={`${styles.other_articles} ${styles.animate}`}
                    image={`${article.headImage.replace(/\\/g, "/")}`}
                    header={article.header}
                    link={article.address}
                    key={article.address}
                    button="לצפייה"
                  />
                );
              })}
            </div>
          )}
          {!isArtcles && (
            <div className={styles.container}>
              {allArticles.map((article, i) => {
                if (i <= 2) {
                  return (
                    <ArticleItem
                      id={styles[article.id]}
                      className={`${styles.other_articles} ${styles.animate}`}
                      image={`${article.headImage.replace(/\\/g, "/")}`}
                      header={article.header}
                      link={article.address}
                      key={article.address}
                      button="לצפייה"
                    />
                  );
                } else return;
              })}
            </div>
          )}
          <div
            className={`${styles.arrow} ${
              isArtcles ? styles.arrow_active : ""
            }`}
            onClick={onArrowClick}
          >
            <FaChevronRight className={styles.icon} size={40} />
          </div>
        </section>
      )}

      {loadedArticles && isMobile && (
        <section className={styles.board}>
          <div className={`${styles.arrow}`} onClick={onArrowClickLeft}>
            <FaChevronLeft className={styles.icon} size={40} />
          </div>

          {allArticles.map((article, i) => {
            if (allArticles[i] === allArticles[current]) {
              return (
                <ArticleItem
                  id={styles[article.id]}
                  className={` ${styles.mobile_articles} ${styles.other_articles} ${styles.animate}`}
                  image={`${article.headImage.replace(/\\/g, "/")}`}
                  header={article.header}
                  link={article.address}
                  key={article.address}
                  button="לצפייה"
                />
              );
            } else return;
          })}

          <div className={`${styles.arrow} `} onClick={onArrowClickRight}>
            <FaChevronRight className={styles.icon} size={40} />
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ArticleNewLayout;
