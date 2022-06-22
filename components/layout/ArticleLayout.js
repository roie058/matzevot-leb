import ArticleItem from "./ArticleItem";
import styles from "./ArticleLayout.module.css";

import ErrorModal from "../../components/UI/ErrorModal";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import { useHttp } from "../../lib/hooks/http-hook";

import { Fragment, useEffect, useState } from "react";

const ArticleLayout = (props) => {
  const { error, isLoading, clearError, sendRequest } = useHttp();
  const [loadedArticles, setLoadedArticles] = useState();

  useEffect(() => {
    const sendArt = async () => {
      try {
        const data = await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/articles"
        );
        const visibleArticles = data.articles.filter(
          (article) => article.isHomePage
        );

        setLoadedArticles(visibleArticles);
      } catch (err) {}
    };

    sendArt();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedArticles && (
        <section className={styles.container}>
          {loadedArticles.map((article) => {
            return (
              <ArticleItem
                className={styles.articles}
                image={`${article.headImage.replace(/\\/g, "/")}`}
                header={article.header}
                link={article.address}
                key={article.address}
                button="לצפייה"
              />
            );
          })}
          <ArticleItem
            className={styles.articles}
            image="/bronza.jpg"
            header="סוגי אותיות"
            link="/wording"
            button="לצפייה"
          />
          <ArticleItem
            className={styles.articles}
            image="/black-granite.jpg"
            header="קטלוג מצבות"
            link="/catalog"
            button="לקטלוג"
          />
        </section>
      )}
    </Fragment>
  );
};

export default ArticleLayout;
