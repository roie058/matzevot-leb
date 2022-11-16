import Link from "next/link";
import Button from "../UI/Button";

//import styles from "./ArticleLayout.module.css";
import styles from "./ArticleNewLayout.module.css";
const ArticleItem = (props) => {
  return (
    <article className={props.className} id={props.id}>
      <Link type="button" className={styles.link} href={props.link}>
        <a>
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${props.image})`,
            }}
          ></div>
          <div className={styles.content}>
            <h2 className={styles.header}>{props.header}</h2>
            <Button className={styles.button}>{props.button}</Button>
          </div>
        </a>
      </Link>
    </article>
  );
};
export default ArticleItem;
