import { useState, useEffect } from "react";
import styles from "./ReviewStars.module.css";
import { FaStar } from "react-icons/fa";

const ReviewStars = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(parseInt(props.rating));
  }, [props.rating]);

  const onClickHandler = (value) => {
    setRating(value);
    props.value(value);
  };

  if (props.isInput === true) {
    return (
      <div className={`${styles.star_large} ${props.className}`} id="grade">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={ratingValue}>
              <input
                className={styles.radio}
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => onClickHandler(ratingValue)}
              ></input>
              <FaStar
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                className={styles.star_input}
                onMouseEnter={() => {
                  setHover(ratingValue);
                }}
                size={35}
                onMouseLeave={() => {
                  setHover(null);
                }}
              />
            </label>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={props.className}>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={ratingValue}>
              <input
                className={styles.radio}
                type="radio"
                name="rating"
                value={ratingValue}
              ></input>
              <FaStar
                color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                className={styles.star}
              />
            </label>
          );
        })}
      </div>
    );
  }
};

export default ReviewStars;
