import { useForm } from "../../lib/hooks/form-hook";
import { useHttp } from "../../lib/hooks/http-hook";

import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Modal from "../UI/Modal";
import { useState, Fragment } from "react";
import ReviewStars from "../UI/ReviewStars";

const NewReview = (props) => {
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      grade: {
        value: "",
        isValid: true,
      },
      name: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { clearError, error, isLoading, sendRequest } = useHttp();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (formState.isValid) {
      try {
        await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews/",
          "POST",
          JSON.stringify({
            description: formState.inputs.description.value,
            grade: formState.inputs.grade.value,
            name: formState.inputs.name.value,
            phone: formState.inputs.phone.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setIsOpen(false);
      } catch (error) {
        console.log(formState);
      }
    } else {
      console.log(formState);
    }
  };

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  const gradeValue = (value) => {
    formState.inputs.grade.value = `${value}`;
  };

  return (
    <Fragment>
      <Button onClick={openModal}>כתיבת ביקורת</Button>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Modal
          onCancel={openModal}
          header="השאר ביקורת"
          show={!!isOpen}
          footer={
            <div>
              <Button onClick={openModal}>ביטול</Button>
            </div>
          }
        >
          <form
            onSubmit={onSubmitHandler}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ReviewStars value={gradeValue} className="star_large" isInput />
            <Input
              element="input"
              id="name"
              label="שם"
              type="text"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
            <Input
              element="input"
              id="phone"
              label="מס טלפון"
              type="tel"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
            <Input
              element="textarea"
              id="description"
              label="?מה חשבת על השירות"
              type="text"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />

            <Button type="submit" disabled={!formState.isValid}>
              שלח
            </Button>
          </form>
        </Modal>
      )}
    </Fragment>
  );
};

export default NewReview;
