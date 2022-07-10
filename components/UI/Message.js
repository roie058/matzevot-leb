import Button from "./Button";
import styles from "./Message.module.css";
import { Fragment, useState, useContext } from "react";

import { AuthContext } from "../../lib/context/auth-context";
import { useHttp } from "../../lib/hooks/http-hook";
import WhatsappButton from "./WhatsappButton";

import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("./ErrorModal"));
const DynamicModal = dynamic(() => import("./Modal"));
const DynamicLoadingSpinner = dynamic(() => import("./LoadingSpinner"));

const Message = (props) => {
  const { clearError, sendRequest, error, isLoading } = useHttp();
  const [deleteState, setDeleteState] = useState(false);
  const authCtx = useContext(AuthContext);

  const cancelDelete = () => {
    setDeleteState(false);
  };

  const onDelete = () => {
    setDeleteState(true);
  };

  const deleteMessage = async (id) => {
    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + authCtx.token }
      );
      setDeleteState(false);
    } catch (err) {}
  };

  return (
    <Fragment>
      <DynamicModal
        onCancel={cancelDelete}
        header="?אתה בטוח שברצונך למחוק את ההודעה לצמיתות"
        show={!!deleteState}
        footer={
          <div>
            <Button deleteButton onClick={() => deleteMessage(props.id)}>
              מחק
            </Button>
            <Button onClick={cancelDelete}>ביטול</Button>
          </div>
        }
      >
        <p>ההודעה תימחק ולא יהיה ניתן לשחזרה</p>
      </DynamicModal>
      <DynamicErrorModal error={error} onClear={clearError} />
      {isLoading && <DynamicLoadingSpinner />}
      {!isLoading && (
        <div className={styles.message_container}>
          <div className={styles.message}>
            <h2>{props.messageType}</h2>
            <h3>שם מלא: {props.fullName}</h3>
            <h3>בית עלמין: {props.graveYard}</h3>
            <h3>{props.catId} :דגם מקטלוג</h3>
            <h3>
              טלפון:<a href={`tel:${props.phone}`}> {props.phone}</a>
            </h3>
            <h3>{props.email}:אימייל</h3>
            <h3>פרטי הבקשה: {props.description}</h3>
          </div>
          <div className={styles.buttons}>
            <Button deleteButton onClick={onDelete}>
              מחק הודעה
            </Button>
            <Button href={`mailto:${props.email}`}>שלח מייל</Button>
            <WhatsappButton
              phone={props.phone}
              text={` היי ${props.fullName} כאן מצבות ליבוביץ קיבלנו את ההודעה שלכם בנושא ${props.messageType}`}
            >
              שלח וואטסאפ
            </WhatsappButton>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Message;
