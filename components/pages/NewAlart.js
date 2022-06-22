import { useForm } from "../../lib/hooks/form-hook";
import { useHttp } from "../../lib/hooks/http-hook";

import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorModal from "../UI/ErrorModal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { VALIDATOR_REQUIRE } from "../util/validators";

import { AuthContext } from "../../lib/context/auth-context";
import { useContext, Fragment } from "react";

const NewAlart = (props) => {
  const [formState, inputHandler] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authCtx = useContext(AuthContext);
  const { clearError, error, isLoading, sendRequest } = useHttp();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (formState.isValid) {
      try {
        await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/alarts/",
          "POST",
          JSON.stringify({
            description: formState.inputs.description.value,
            creator: authCtx.userId,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          }
        );
      } catch (error) {
        console.log(formState);
      }
    } else {
      console.log(formState);
    }
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form onSubmit={onSubmitHandler}>
          <Input
            element="textarea"
            id="description"
            label="התראה חדשה"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <Button type="submit" disabled={!formState.isValid}>
            הוסף להתראות
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default NewAlart;
