import React, { useState } from "react";

import classes from "./ModifyTetherAmount.module.css";
import useInput from "../../hooks/use-input";
import persianNumsToEnglish from "../../util/persianNums-to-english";
import useSetTether from "../../hooks/use-set-tether";
import { useDispatch } from "react-redux";
import { useNotification } from "../../hooks/use-notification";

const validator = (val) => {
  let regex = /^[+-]?[0-9]+\.?[0-9]*$/;
  const condition1 = regex.test(val);

  const isValid = condition1;
  const errorMessage = isValid ? "543543" : "لطفا مقدار معتبر وارد کنید.";

  return {
    isValid,
    errorMessage,
  };
};

const ModifyTetherAmount = () => {
  const {
    value,
    isValid,
    hasError,
    errorMessage,
    valueChangeHandler,
    inputblurHandler,
    reset,
  } = useInput({
    isMutableIfHasError: false,
    valueValidator: validator,
    valueModifier: persianNumsToEnglish,
  });

  const dispatch = useDispatch();

  const { mutate } = useSetTether();

  const { addNote } = useNotification();

  const [counter, setCounter] = useState(0);

  const submitNewValueHandler = (e) => {
    e.preventDefault();
    mutate(parseFloat(value));
    addNote({
      type: "SUCCESS",
      message: "مقدار جدید تتر ثبت شد",
      title: "Successful Request",
    });
    setCounter((prev) => prev + 1);
  };

  return (
    <div className={`${classes["ModifyTetherAmount"]}`}>
      <h1>مقدار جدید تتر را در ورودی زیر ثبت کنید</h1>
      <form>
        <input
          className={`${hasError ? classes["has-error"] : null}`}
          value={value}
          onChange={valueChangeHandler}
          onBlur={inputblurHandler}
          placeholder="100.00"
        />
        <button onClick={submitNewValueHandler} disabled={!isValid}>
          ثبت مقدار جدید
        </button>
      </form>
    </div>
  );
};

export default ModifyTetherAmount;