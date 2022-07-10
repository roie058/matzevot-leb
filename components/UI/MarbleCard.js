import Image from "next/image";
import Button from "./Button";
import styles from "./MarbleCard.module.css";

const MarbleCard = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.card__header}>
          <Image
            src={"/" + props.img}
            alt="card__image"
            className={styles.card__image}
            width="600"
            height="600"
          />
        </div>
        <div className={styles.card__body}>
          <h4>{props.header}</h4>
          <Button to={`/catalog/${props.link}`}>למצבות מ{props.header}</Button>
          <p>{props.p}</p>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.user}>
            <div className={styles.user__info}>
              <h5>:ציון</h5>
              <small>
                איכות: {props.quality}
                <br />
                מחיר: {props.price}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarbleCard;
