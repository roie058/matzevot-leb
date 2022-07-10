import { useState } from "react";
import styles from "./Slider.module.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import Image from "next/image";
const Slider = (props) => {
  const [slideNum, setSlideNum] = useState(0);
  const length = props.images.length;

  const onLeftClick = () => {
    if (slideNum === 0) {
      setSlideNum(length - 1);
    } else {
      setSlideNum(slideNum - 1);
    }
  };
  const onRightClick = () => {
    if (slideNum === length - 1) {
      setSlideNum(0);
    } else {
      setSlideNum(slideNum + 1);
    }
  };

  if (Array.isArray(props.images) && length <= 0) {
    return null;
  }

  return (
    <div className={styles.slider}>
      <FaArrowAltCircleLeft
        className={styles.arrow_left}
        onClick={onLeftClick}
      />
      <FaArrowAltCircleRight
        className={styles.arrow_right}
        onClick={onRightClick}
      />
      {props.images.map((image, index) => {
        return (
          <div
            className={
              index === slideNum
                ? `${styles.slide}${styles.active}`
                : styles.slide
            }
            key={index}
          >
            {index === slideNum && (
              <Image
                key={image.id}
                className={styles.image}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
