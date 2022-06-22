import styles from "./ArticlePage.module.css";

import Gallery from "../UI/Gallery";
const ArticlePage = (props) => {
  let images = [];
  if (typeof props.img[0] === "string") {
    for (let index = 0; index < props.img.length; index++) {
      const element = props.img[index];
      const image = element.replace(/\\/g, "/");
      images.push({
        id: image,
        src: image,
        alt: props.header,
      });
    }
  } else if (props.img) {
    images = props.img;
  } else {
    images = [];
  }
  return (
    <article>
      <h1 className={styles.header}>{props.header}</h1>
      <p className={styles.header_text}>{props.headerText}</p>
      <Gallery img={images} maxHeight="50vh" maxWidth="100%" />

      {props.content &&
        props.content.map((p, index) => {
          return (
            <div key={index} className={styles.paragraph}>
              <h2>{p.sub}</h2>
              <p>{p.text}</p>
            </div>
          );
        })}
    </article>
  );
};

export default ArticlePage;
