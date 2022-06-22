import styles from "../../styles/Catalog.module.css";
import Link from "next/link";
const CatalogCard = (props) => {
  //props to=props.link bg=props.bg category=props.category heading=props.heading

  return (
    <Link href={`/catalog/${props.link}`}>
      <a className={styles.card}>
        <div
          className={styles.card__background}
          style={{
            backgroundImage: `url(${props.bg})`,
          }}
        ></div>
        <div className={styles.card__content}>
          <p className={styles.card__category}>{props.category}</p>
          <h3 className={styles.card__heading}>{props.heading}</h3>
        </div>
      </a>
    </Link>
  );
};
export default CatalogCard;
