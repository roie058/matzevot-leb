import { Fragment, useState, useEffect, useContext } from "react";
import Button from "../components/UI/Button";
import Container from "../components/UI/Container";
import styles from "../styles/Reviews.module.css";
import ReviewStars from "../components/UI/ReviewStars";
import { useHttp } from "../lib/hooks/http-hook";
import { AuthContext } from "../lib/context/auth-context";
import { httpHandlr } from "../lib/httpHandler";

import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("../components/UI/ErrorModal"));
const DynamicModal = dynamic(() => import("../components/UI/Modal"));
const DynamicLoadingSpinner = dynamic(() =>
  import("../components/UI/LoadingSpinner")
);

const Reviews = (props) => {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const loadedReviews = props.loadedReviews;
  const [deleteState, setDeleteState] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    setRender();
  }, [render]);

  const cancelDelete = () => {
    setDeleteState(false);
  };

  const onDelete = (id) => {
    setDeleteState(true);
    setDeleteId(id);
  };

  const deleteReview = async (id) => {
    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      setDeleteState(false);
      setDeleteId(null);
      setRender(id);
    } catch (err) {}
  };

  const changeVisibility = async (id, visibility) => {
    try {
      const data = await sendRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${id}`,
        "PATCH",
        JSON.stringify({
          isVisible: !visibility,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authCtx.token,
        }
      );

      setRender(data);
    } catch (err) {}
  };

  return (
    <Fragment>
      <DynamicErrorModal error={error} onClear={clearError} />
      <DynamicModal
        onCancel={cancelDelete}
        header="?אתה בטוח שברצונך למחוק את הביקורת לצמיתות"
        show={!!deleteState}
        footer={
          <div>
            <Button onClick={() => deleteReview(deleteId)}>מחק</Button>
            <Button onClick={cancelDelete}>ביטול</Button>
          </div>
        }
      >
        <p>לא ניתן יהיה לשחזר את היקורת לאחר מכן</p>
      </DynamicModal>
      {isLoading && <DynamicLoadingSpinner />}
      {!isLoading &&
        loadedReviews &&
        loadedReviews.map((review) => {
          return (
            <div className={styles.review_container} key={review.id}>
              <div className={styles.review}>
                <p className={styles.quote}>{review.description}</p>
                <ReviewStars className="star_review" rating={review.grade} />
                <span className={styles.name}>
                  {review.name}:{review.phone}
                </span>
              </div>
              <div>
                <Button onClick={() => onDelete(review.id)}>מחק ביקורת</Button>
                {review.isVisible && (
                  <Button
                    onClick={() =>
                      changeVisibility(review.id, review.isVisible)
                    }
                  >
                    הסתר ביקורת מהמסך הראשי
                  </Button>
                )}
                {!review.isVisible && (
                  <Button
                    onClick={() =>
                      changeVisibility(review.id, review.isVisible)
                    }
                  >
                    הצג ביקורת במסך הראשי
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      {!isLoading && loadedReviews && loadedReviews.length === 0 && (
        <Container>
          <div>אין ביקורות </div>
        </Container>
      )}
    </Fragment>
  );
};

export async function getStaticProps() {
  const { sendRequest, error } = httpHandlr();

  const data = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews"
  );

  return {
    props: {
      loadedReviews: data.reviews,
      error,
    },
    revalidate: 1,
  };
}

export default Reviews;
