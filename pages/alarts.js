import { Fragment, useState, useEffect, useContext } from "react";
import Button from "../components/UI/Button";
import NewAlart from "../components/pages/NewAlart";
import styles from "../styles/Alarts.module.css";
import { useHttp } from "../lib/hooks/http-hook";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorModal from "../components/UI/ErrorModal";
import Modal from "../components/UI/Modal";
import { AuthContext } from "../lib/context/auth-context";
import { httpHandlr } from "../lib/httpHandler";

const Alarts = (props) => {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const loadedAlarts = props.loadedAlarts;
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/alarts/${id}`,
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
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        onCancel={cancelDelete}
        header="?אתה בטוח שברצונך למחוק את ההתראה לצמיתות"
        show={!!deleteState}
        footer={
          <div>
            <Button onClick={() => deleteReview(deleteId)}>מחק</Button>
            <Button onClick={cancelDelete}>ביטול</Button>
          </div>
        }
      >
        <p>לא ניתן יהיה לשחזר את ההתראה לאחר מכן</p>
      </Modal>
      {isLoading && <LoadingSpinner />}
      {!isLoading &&
        loadedAlarts &&
        loadedAlarts.map((alart) => {
          return (
            <div key={alart.id} className={styles.alart}>
              <h4>{alart.description}</h4>
              <Button onClick={() => onDelete(alart.id)}>מחק התראה </Button>
            </div>
          );
        })}
      <NewAlart />
    </Fragment>
  );
};
export async function getStaticProps() {
  const { sendRequest, error } = httpHandlr();

  const alartData = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/alarts"
  );

  return {
    props: {
      loadedAlarts: alartData.alarts,
      error,
    },
    revalidate: 1,
  };
}

export default Alarts;
