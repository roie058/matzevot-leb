import styles from "./Card.module.css";
import { Fragment, useRef, useState, useEffect, useContext } from "react";
import Button from "./Button";
import { useHttp } from "../../lib/hooks/http-hook";
import LoadingSpinner from "./LoadingSpinner";
import ErrorModal from "./ErrorModal";
import Modal from "./Modal";
import { AuthContext } from "../../lib/context/auth-context";
import WhatsappButton from "./WhatsappButton";

const Card = (props) => {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIshovered] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [imageState, setImageState] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState();
  const tombDetails = useRef();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    setRender();
  }, [render]);

  const hoverMobileHandler = () => {
    setIshovered(!isHovered);
  };

  const copyHandler = () => {
    navigator.clipboard.writeText(
      `${props.image}:תמונה 
      ${tombDetails.current.innerText}:פרטי המצבה`
    );
    setIsCopied(true);
  };

  const image = props.image.replace(/\\/g, "/");

  const cancelDelete = () => {
    setDeleteState(false);
  };

  const onDelete = (id) => {
    setDeleteState(true);
    setDeleteId(id);
  };

  const cancelPhoto = () => {
    setImageState(false);
  };
  const onPhoto = () => {
    setImageState(true);
  };

  const deleteReview = async (id) => {
    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog/${props.edit}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      setDeleteState(false);
      setDeleteId(null);
      setRender(props.edit);
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        onCancel={cancelPhoto}
        header={props.id}
        show={!!imageState}
        footer={
          <div>
            <Button onClick={cancelPhoto}>סגור</Button>
          </div>
        }
      >
        <img
          src={props.image}
          alt={props.description}
          style={{ maxHeight: "50vh", maxWidth: "100%", alignSelf: "center" }}
        />
      </Modal>
      <Modal
        onCancel={cancelDelete}
        header="?אתה בטוח שברצונך למחוק את הפריט לצמיתות"
        show={!!deleteState}
        footer={
          <div>
            <Button onClick={() => deleteReview(deleteId)}>מחק</Button>
            <Button onClick={cancelDelete}>ביטול</Button>
          </div>
        }
      >
        <p>לא ניתן יהיה לשחזר את הפריט לאחר מכן</p>
      </Modal>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div
          className={`${styles.col} ${isHovered ? styles.hover : ""}`}
          onTouchStart={hoverMobileHandler}
        >
          <div className={styles.container}>
            <div
              className={styles.front}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className={styles.inner}></div>
            </div>
            <div
              className={styles.back}
              style={{
                backgroundSize: "contain",
                background: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7)),url(${image}) no-repeat center`,
              }}
            >
              <div className={styles.inner}>
                <Button className={styles.delete} onClick={() => onPhoto()}>
                  לתמונה המלאה
                </Button>
                <h3>פרטי המצבה</h3>
                <p ref={tombDetails}>
                  {props.id}:מספר מקטלוג
                  <br></br> {props.description}
                </p>
                <button onClick={copyHandler} className={styles.copy}>
                  {isCopied ? " פרטים הועתקו" : "העתק פרטים"}
                </button>

                <WhatsappButton
                  id={props.id}
                  description={props.description}
                  image={image}
                  catalog
                >
                  לקבלת הצעת מחיר בוואטסאפ
                </WhatsappButton>
                {props.isAdmin && (
                  <div>
                    <Button
                      to={`/catalog/edit/${props.edit}`}
                      replace
                      className={styles.edit}
                    >
                      שנה פרטים
                    </Button>
                    <Button
                      className={styles.delete}
                      deleteButton
                      onClick={() => onDelete(props.edit)}
                    >
                      מחק מקטלוג
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Card;
