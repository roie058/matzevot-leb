import Link from "next/link";

import styles from "./Button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a className={props.className || "button"} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        href={props.to}
        replace={props.replace}
        className={props.className || "button"}
      >
        <a className="button">{props.children}</a>
      </Link>
    );
  }
  if (props.deleteButton) {
    return (
      <button
        className={props.className || styles.delete}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  } else {
    return (
      <button
        className={props.className || "button"}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
};

export default Button;
