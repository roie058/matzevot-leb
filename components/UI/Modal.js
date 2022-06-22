import React, { Fragment, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./Modal.module.css";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`${styles.modal} ${props.className}`}
      style={props.style}
      ref={props.reference}
    >
      <header className={`${styles.modal__header}  ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>

      <div className={`${styles.modal__content}  ${props.contentClass}`}>
        {props.children}
      </div>
      <footer className={`${styles.modal__footer} ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  return createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const nodeRef = useRef(null);
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={styles.modal}
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} reference={nodeRef} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
