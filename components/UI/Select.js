import React, { useReducer, useEffect } from "react";

import { validate } from "../util/validators.js";
import styles from "./Select.module.css";

const selectReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return { ...state, isTouched: true };
    default:
      return state;
  }
};

const Select = (props) => {
  const [inputState, dispatch] = useReducer(selectReducer, {
    value: props.value || (props.value !== false && "בחר"),
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div
      className={`${styles.container} ${
        !inputState.isValid && inputState.isTouched && styles.container_invalid
      } `}
    >
      <select
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option disabled>בחר</option>
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      <label htmlFor={props.id}>{props.label}</label>
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Select;
