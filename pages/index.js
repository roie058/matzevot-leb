import { Fragment, useState } from "react";

import ArticleNewLayout from "../components/layout/ArticleNewLayout";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import ErrorModal from "../components/UI/ErrorModal";
import InfiniteSlider from "../components/UI/infiniteSlider";
import ReviewDisplay from "../components/UI/ReviewDisplay";
import WhatsappButton from "../components/UI/WhatsappButton";

import { httpHandlr } from "../lib/httpHandler";
const { sendRequest, error, clearError } = httpHandlr();

const HomePage = (props) => {
  const [loadedReviews, setLoadedReviews] = useState(props.loadedReviews);
  const [loadedAlarts, setLoadedAlarts] = useState(props.loadedAlarts);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Container>
        <h1>מצבות ליבוביץ</h1>
        <p>
          מצבות ואנדרטאות בכל רחבי הארץ
          <br />
          ! שמים את השירות והאמינות מעל הכל
          <br />
          עסק משפחתי שמתמחה בתחום כבר למעלה מ40 שנה
        </p>
      </Container>

      <ArticleNewLayout
        clearError={clearError}
        error={props.error}
        loadedArticles={props.loadedArticles}
      />

      <div>
        <h2>לקבלת הצעת מחיר על מצבה</h2>

        <Button href="/contact">השאר הודעה באתר</Button>
        <WhatsappButton phone="0546660848" text="">
          או בוואטסאפ
        </WhatsappButton>
      </div>

      {loadedAlarts && <InfiniteSlider alarts={loadedAlarts} />}
      {!loadedAlarts && <InfiniteSlider alarts={[]} />}
      {loadedReviews && <ReviewDisplay reviews={loadedReviews} />}
      {!loadedReviews && (
        <ReviewDisplay
          reviews={[
            {
              id: "1",
              grade: "5",
              description: ".אין ביקורות",
              name: "מצבות",
              isVisible: true,
            },
          ]}
        />
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const articleData = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/articles"
  );

  const visibleArticles = articleData.articles.filter(
    (article) => article.isHomePage
  );

  const data = await sendRequest(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`
  );

  const visibleReviews = data.reviews.filter((review) => review.isVisible);

  const alartData = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/alarts"
  );

  return {
    props: {
      loadedArticles: visibleArticles,
      loadedReviews: visibleReviews,
      loadedAlarts: alartData.alarts,
      error,
    },
    revalidate: 10,
  };
}

export default HomePage;
