import Image from "next/image";
import styles from "./Footer.module.css";

import wazeImage from "../../public/icon-waze.png";
const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>
        <h4>שעות הפעילות</h4>
        <p>
          ימים א׳-ה׳: 9:00–14:00
          <br />
          ימים ו׳-ש׳: סגור
        </p>
      </div>
      <div>
        <h4>כתובת</h4>
        <button type="button">
          <a href="https://waze.com/ul/hsv8v2x0ew">נווט אלינו</a>
          <Image
            className={styles.img}
            src={wazeImage}
            height="50px"
            width="50px"
            alt="כפתור ניווט"
          />
        </button>

        <p>רחבת בית העלמין ברחוב גורדסקי רחובות, ישראל</p>
      </div>
    </footer>
  );
};

export default Footer;
