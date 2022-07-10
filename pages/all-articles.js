import { Fragment, useState, useEffect, useContext } from "react";
import Button from "../components/UI/Button";
import styles from "../styles/AllArticles.module.css";
import { useHttp } from "../lib/hooks/http-hook";
import NewArticle from "../components/pages/NewArticle";
import Container from "../components/UI/Container";
import { AuthContext } from "../lib/context/auth-context";
import { httpHandlr } from "../lib/httpHandler";
import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("../components/UI/ErrorModal"));
const DynamicModal = dynamic(() => import("../components/UI/Modal"));
const DynamicLoadingSpinner = dynamic(() =>
  import("../components/UI/LoadingSpinner")
);

const AllArticles = (props) => {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const loadedArticles = props.loadedArticles;
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      setDeleteState(false);
      setDeleteId(null);
      setRender(id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <DynamicErrorModal error={error} onClear={clearError} />
      <DynamicModal
        onCancel={cancelDelete}
        header="?אתה בטוח שברצונך למחוק את המאמר לצמיתות"
        show={!!deleteState}
        footer={
          <div>
            <Button onClick={() => deleteReview(deleteId)}>מחק</Button>
            <Button onClick={cancelDelete}>ביטול</Button>
          </div>
        }
      >
        <p>לא ניתן יהיה לשחזר את המאמר לאחר מכן</p>
      </DynamicModal>
      {isLoading && <DynamicLoadingSpinner />}
      {!isLoading &&
        loadedArticles &&
        loadedArticles.map((article) => {
          return (
            <div key={article.id} className={styles.article}>
              <h4>
                <a href={article.address}>{article.header}</a>
              </h4>

              <Button deleteButton onClick={() => onDelete(article.id)}>
                מחק מאמר
              </Button>
              <Button to={`/article/edit/${article.id}`}>ערוך מאמר</Button>
            </div>
          );
        })}
      <Container>
        <h3>הוסף מאמר</h3>
        <NewArticle />
      </Container>
    </Fragment>
  );
};

export async function getStaticProps() {
  const { sendRequest, error } = httpHandlr();

  const data = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/articles"
  );

  return {
    props: {
      loadedArticles: data.articles,
      error,
    },
    revalidate: 1,
  };
}

export default AllArticles;
