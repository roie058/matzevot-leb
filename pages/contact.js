import { Fragment, useState, useEffect } from "react";
import Select from "../components/UI/Select";
import styles from "../styles/Contact.module.css";
import { useForm } from "../lib/hooks/form-hook";
import Input from "../components/UI/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/util/validators.js";
import Button from "../components/UI/Button";

import ErrorModal from "../components/UI/ErrorModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useHttp } from "../lib/hooks/http-hook";
import Container from "../components/UI/Container";

const Contact = () => {
  const { error, isLoading, clearError, sendRequest } = useHttp();
  const [reqSent, setReqSent] = useState(false);
  const [isOffer, setIsOffer] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      fullName: {
        value: "",
        isValid: false,
      },
      graveYard: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      messageType: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const messageType = formState.inputs.messageType.value;

  useEffect(() => {
    if (messageType === "תיקון/חידוש מצבה קיימת") {
      setFormData({ ...formState.inputs, catId: undefined });
      setIsOffer(false);
    } else {
      setFormData(
        { ...formState.inputs, catId: { value: "", isValid: false } },
        false
      );
      setIsOffer(true);
    }
  }, [messageType, setFormData]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (formState.isValid) {
      if (isOffer) {
        try {
          await sendRequest(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/messages/",
            "POST",
            JSON.stringify({
              description: formState.inputs.description.value,
              fullName: formState.inputs.fullName.value,
              graveYard: formState.inputs.graveYard.value,
              phone: formState.inputs.phone.value,
              email: formState.inputs.email.value,
              messageType,
              catId: formState.inputs.catId.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setReqSent(true);
        } catch (error) {
          console.log(formState);
        }
      } else {
        try {
          await sendRequest(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/messages/",
            "POST",
            JSON.stringify({
              description: formState.inputs.description.value,
              fullName: formState.inputs.fullName.value,
              graveYard: formState.inputs.graveYard.value,
              phone: formState.inputs.phone.value,
              email: formState.inputs.email.value,
              messageType,
            }),
            {
              "Content-Type": "application/json",
            }
          );
          setReqSent(true);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log(formState);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Container>
        <h2>צור קשר איתנו</h2>
        <h3>:מספרי טלפון</h3>
        <p>
          טלפון משרד: <a href={`tel:089459323`}>089459323</a>
          <br />
          איתן ליבוביץ: <a href={`tel:089459323`}>0546660848</a>
        </p>
        <p> לקבלת הצעת מחיר על מצבה אנא השאר פרטים ויחזרו אלייך בהקדם</p>

        {reqSent && <p>הבקשה נשלחה בהצלחה נציג יחזור אלייך בהקדם</p>}
        {isLoading && <LoadingSpinner />}
        {!isLoading && !reqSent && (
          <form onSubmit={onSubmitHandler} id="form" className={styles.form}>
            <Select
              options={[
                {
                  value: "תיקון/חידוש מצבה קיימת",
                  text: "תיקון/חידוש מצבה קיימת",
                },
                { value: "הצעת מחיר עבור מצבה", text: "הצעת מחיר עבור מצבה" },
                { value: "אנדרטאות", text: "אנדרטאות" },
                { value: "אחר", text: "אחר" },
              ]}
              id="messageType"
              label=":סוג הודעה"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
              element="input"
              id="fullName"
              label="שם מלא"
              type="text"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
              element="input"
              id="graveYard"
              label="מקום המצבה(בית עלמין)"
              type="text"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
              element="input"
              id="phone"
              label="מס' טלפון"
              type="tel"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
            />

            <Input
              element="input"
              id="email"
              label='כתובת דוא"ל'
              type="email"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            />

            {isOffer && (
              <Input
                element="input"
                id="catId"
                label="מס' מצבה מקטלוג"
                type="text"
                onInput={inputHandler}
                validators={[VALIDATOR_REQUIRE()]}
              />
            )}

            <Input
              id="description"
              label="פרטי הבקשה"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Button type="submit" disabled={!formState.isValid}>
              שלח פרטים
            </Button>
          </form>
        )}
      </Container>
    </Fragment>
  );
};

export default Contact;
