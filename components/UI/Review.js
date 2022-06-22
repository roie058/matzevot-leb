import ReviewStars from "./ReviewStars";
import styles from "./Review.module.css";

const Review = (props) => {
  return (
    <div className={styles.review}>
      <p className={styles.quote}>{props.description}</p>
      <ReviewStars className="star_review" rating={props.rating} />
      <span className={styles.name}>{props.name}</span>
    </div>
  );
};

export default Review;
