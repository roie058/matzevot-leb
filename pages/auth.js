import { useContext, useState, Fragment } from "react";

import { AuthContext } from "../lib/context/auth-context";
import { useForm } from "../lib/hooks/form-hook";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import styles from "../styles/Auth.module.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/util/validators";
import { useRouter } from "next/router";
import { useHttp } from "../lib/hooks/http-hook";
import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("../components/UI/ErrorModal"));
const DynamicLoadingSpinner = dynamic(() =>
  import("../components/UI/LoadingSpinner")
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const router = useRouter();

  const switchModeHandler = (event) => {
    event.preventDefault();
    if (!isLogin) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (formState.isValid) {
      if (isLogin) {
        try {
          const userData = await sendRequest(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login",
            "POST",
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );

          authCtx.login(userData.userId, userData.token, userData.isAdmin);
          router.push("/");
        } catch (err) {}
      } else {
        try {
          const userData = await sendRequest(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/users/signup",
            "POST",
            JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
            {
              "Content-Type": "application/json",
            }
          );

          authCtx.login(userData.userId, userData.token, userData.isAdmin);
          router.push("/");
        } catch (err) {}
      }
    }
  };

  return (
    <Fragment>
      <DynamicErrorModal error={error} onClear={clearError} />
      <div className={styles.auth}>
        {isLoading && <DynamicLoadingSpinner asOverlay />}

        <form onSubmit={onSubmitHandler}>
          {!isLogin && (
            <Input
              element="input"
              id="name"
              label="שם"
              type="text"
              onInput={inputHandler}
              errorText=".כתוב שם בבקשה"
              validators={[VALIDATOR_REQUIRE()]}
            />
          )}
          <Input
            element="input"
            id="email"
            label="כתובת מייל"
            type="email"
            onInput={inputHandler}
            errorText="בבקשה כתוב מייל"
            validators={[VALIDATOR_EMAIL()]}
          />
          <Input
            element="input"
            id="password"
            label="סיסמה"
            type="password"
            onInput={inputHandler}
            errorText="בבקשה כתוב סיסמה לפחות 8 מספרים או אותיות"
            validators={[VALIDATOR_MINLENGTH(8)]}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLogin ? "התחבר" : "הרשם"}
          </Button>
          <Button onClick={switchModeHandler}>
            {isLogin ? "משתמש חדש" : "משתמש קיים"}
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default Auth;
