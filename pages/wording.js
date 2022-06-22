import { Fragment } from "react";
import Card3d from "../components/UI/Card3d";

import { httpHandlr } from "../lib/httpHandler";
const { sendRequest, error, clearError } = httpHandlr();

const LattersPage = (props) => {
  return (
    <Fragment>
      <h2>כיתוב על מצבה</h2>
      <p>
        בחירת הכיתוב על המצבה הינה חלק עיקרי וחשוב בתהליך בניית המצבה יש לציין
        שהמלל הנכתב הוא שלכם ולכן אתם יכולים לכתוב מה שנראה לכם שמתאר את הנפטר
        בצורה המתאימה והמכבדת ביותר עבורכם
        <br />
        בנוסף בהתאם למצבה שבחרתם סוג הכיתוב חשוב גם הוא והוא קובע את רמת תחזוקת
        המצבה לאורך השנים
      </p>
      <Card3d
        clearError={clearError}
        error={props.error}
        loadedArticles={props.loadedArticles}
      />
    </Fragment>
  );
};

export async function getStaticProps() {
  const articleData = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/articles"
  );

  const visibleArticles = articleData.articles.filter(
    (article) => article.isWordingPage
  );

  return {
    props: {
      loadedArticles: visibleArticles,
      error,
    },
    revalidate: 10,
  };
}

export default LattersPage;
