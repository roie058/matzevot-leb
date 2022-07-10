import Image from "next/image";
import React, { useRef, useState, useEffect, Fragment } from "react";

import Button from "./Button";
import styles from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    const fileChange = async () => {
      if (!file) {
        return;
      }

      if (file.length > 1) {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file[0]);

        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
      } else {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(file);
      }
    };
    fileChange();
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else if (event.target.files && event.target.files.length > 1) {
      let readers = [];
      for (const key in event.target.files) {
        if (Object.hasOwnProperty.call(event.target.files, key)) {
          const element = event.target.files[key];
          readers.push(element);
        }
      }

      pickedFile = event.target.files;

      setFile(readers);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Fragment>
      {!props.multiple && (
        <div className={styles.form_control}>
          <input
            id={props.id}
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />
          <div
            className={
              props.center ? styles.image_upload_center : styles.image_upload
            }
          >
            <div className={styles.image_upload__preview}>
              {(previewUrl || props.image) && (
                <Image
                  src={previewUrl ? previewUrl : props.image}
                  alt="Preview"
                  width={500}
                  height={500}
                />
              )}

              {!previewUrl && !props.image && <p>בחר תמונה בבקשה</p>}
            </div>
            <Button type="button" onClick={pickImageHandler}>
              בחר תמונה
            </Button>
          </div>
          {!isValid && <p>{props.errorText}</p>}
        </div>
      )}

      {props.multiple && (
        <div className={styles.form_control}>
          <input
            multiple
            id={props.id}
            ref={filePickerRef}
            style={{ display: "none" }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={pickedHandler}
          />
          <div
            className={
              props.center ? styles.image_upload_center : styles.image_upload
            }
          >
            <div className={styles.image_upload__preview}>
              {(previewUrl || props.image) && (
                <Image
                  src={previewUrl ? previewUrl : props.image}
                  alt="Preview"
                  width={500}
                  height={500}
                />
              )}
              {!previewUrl && !props.image && <p>בחר תמונה בבקשה</p>}
            </div>
            <Button type="button" onClick={pickImageHandler}>
              בחר תמונה
            </Button>
          </div>
          {!isValid && <p>{props.errorText}</p>}
        </div>
      )}
    </Fragment>
  );
};

export default ImageUpload;
