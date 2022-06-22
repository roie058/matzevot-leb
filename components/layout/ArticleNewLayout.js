import ArticleItem from "./ArticleItem";
import styles from "./ArticleNewLayout.module.css";
import { FaChevronRight } from "react-icons/fa";
import ErrorModal from "../../components/UI/ErrorModal";

import { Fragment, useState } from "react";

const ArticleNewLayout = (props) => {
  const loadedArticles = props.loadedArticles;
  const [isArtcles, setIsArticles] = useState(false);

  const onArrowClick = (e) => {
    e.preventDefault();
    setIsArticles(!isArtcles);
  };

  return (
    <Fragment>
      <ErrorModal error={props.error} onClear={props.clearError} />
      {loadedArticles && (
        <section className={styles.container}>
          {isArtcles && (
            <div className={styles.next_articles}>
              {loadedArticles.map((article) => {
                return (
                  <ArticleItem
                    className={styles.other_articles}
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
          <div
            className={`${styles.arrow} ${
              isArtcles ? styles.arrow_active : ""
            }`}
            onClick={onArrowClick}
          >
            <FaChevronRight className={styles.icon} size={40} />
          </div>

          <div
            className={`${styles.articles} ${
              isArtcles ? styles.articles_active : ""
            }`}
          >
            <ArticleItem
              className={styles.other_articles}
              image="/bronza.jpg"
              header="סוגי אותיות"
              link="/wording"
              button="לצפייה"
            />
            <ArticleItem
              className={styles.other_articles}
              image="/turkish-marble.jpg"
              header="סוג השיש"
              link="/marbles"
              button="לצפייה"
            />
          </div>
          <div
            className={`${styles.articles} ${
              isArtcles ? styles.articles_active : ""
            }`}
          >
            <ArticleItem
              className={styles.other_articles}
              image="/black-granite.jpg"
              header="קטלוג מצבות"
              link="/catalog"
              button="לקטלוג"
            />
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ArticleNewLayout;
