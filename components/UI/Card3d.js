import { Fragment } from "react";
import Link from "next/link";
import styles from "./Card3d.module.css";

import ErrorModal from "../../components/UI/ErrorModal";

const Card3d = (props) => {
  const loadedArticles = props.loadedArticles;

  let articles = [];

  if (loadedArticles) {
    loadedArticles.map((article) => {
      const image = article.headImage.replace(/\\/g, "/");
      return articles.push(
        <Link key={article.address} href={article.address}>
          <a>
            <div className={styles.card_container}>
              <div className={styles.overlay}></div>
              <div className={styles.overlay}></div>
              <div className={styles.overlay}></div>
              <div className={styles.overlay}></div>
              <div
                className={styles.card}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "100%",
                }}
              >
                <h4 className={styles.h4}>{article.header}</h4>
                <span className={styles.chev}>&rsaquo;</span>
              </div>
            </div>
          </a>
        </Link>
      );
    });
  }

  let articles1 = articles.filter((article, i) => {
    return i <= 1;
  });

  let articles2 = articles.filter((article, i) => {
    return i >= 2 && i < 4;
  });

  let articles3 = articles.filter((article, i) => {
    return i >= 4;
  });

  return (
    <Fragment>
      <ErrorModal error={props.error} onClear={props.clearError} />

      {loadedArticles && (
        <div className={styles.container}>
          <div className={styles.col}>
            {articles1.map((article) => {
              return article;
            })}
          </div>
          <div className={styles.col}>
            {articles2.map((article) => {
              return article;
            })}
          </div>
          <div className={styles.col}>
            {articles3.map((article) => {
              return article;
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Card3d;
