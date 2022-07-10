import Image from "next/image";
import { useEffect, useState } from "react";
import whatsappPic from "../../public/whatsapp-icon.png";
import styles from "./WhatsappButton.module.css";

const WhatsappButton = (props) => {
  const [link, setLink] = useState();

  const whatsappLink = (content) => {
    const re = / /gi;
    const whatsappContent = content.replace(re, "%20");

    setLink(
      `https://api.whatsapp.com/send?phone=0546660848&text=${whatsappContent}`
    );
  };
  //content = `:תמונה${props.image} פרטי המצבה:${props.description} :שלום רב אני רציתי לבקש הצעת מחיר על מצבה מספר מקטלוג ${props.id} `
  useEffect(() => {
    let content;
    if (props.catalog) {
      content = ` ${props.image}  :שלום רב רציתי לקבל הצעת מחיר על מצבה פרטי המצבה ${props.description} `;

      whatsappLink(content);
    } else {
      setLink(
        `https://api.whatsapp.com/send?phone=${props.phone}&text=${props.text}`
      );
    }
  }, [props]);

  return (
    <div>
      <a
        href={link}
        className={styles.whatsapp_link}
        target="_blank"
        rel="noreferrer"
      >
        <button className={styles.whatsapp}>
          <Image
            src={whatsappPic}
            height={"30px"}
            width={"30px"}
            alt="כפתור וואטסאפ"
          />
          <p className={styles.whatsapp_text}>{props.children}</p>
        </button>
      </a>
    </div>
  );
};

export default WhatsappButton;
