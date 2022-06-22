import { useForm } from "../../lib/hooks/form-hook";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../util/validators";

import Select from "../UI/Select";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner";

import { useHttp } from "../../lib/hooks/http-hook";

import { AuthContext } from "../../lib/context/auth-context";
import { useContext, Fragment, useState } from "react";
import ImageUpload from "../UI/ImageUpload";

const NewArticle = (props) => {
  const authCtx = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      header: {
        value: "",
        isValid: false,
      },
      headerText: {
        value: "",
        isValid: false,
      },
      images: {
        value: null,
        isValid: false,
      },
      headImage: {
        value: null,
        isValid: false,
      },
      isWordingPage: {
        value: "",
        isValid: false,
      },
      isHomePage: {
        value: "",
        isValid: false,
      },
      address: {
        value: "/article/",
        isValid: false,
      },
    },
    false
  );
  const [peragraphNum, setPeragraphNum] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let contentArray = [];
    if (formState.isValid) {
      try {
        if (peragraphNum.length > 0) {
          for (let index = 0; index < peragraphNum.length; index++) {
            const subName = `sub${index}`;
            const textName = `text${index}`;
            const pushObject = {
              sub: formState.inputs[subName].value,
              text: formState.inputs[textName].value,
            };
            contentArray.push(pushObject);
          }
        }

        setFormData(
          {
            header: {
              value: formState.inputs.header.value,
              isValid: true,
            },
            headerText: {
              value: formState.inputs.headerText.value,
              isValid: true,
            },
            images: {
              value: formState.inputs.images.value,
              isValid: true,
            },
            headImage: {
              value: formState.inputs.headImage.value,
              isValid: true,
            },
            isWordingPage: {
              value: formState.inputs.isWordingPage.value,
              isValid: true,
            },
            isHomePage: {
              value: formState.inputs.isHomePage.value,
              isValid: true,
            },
            address: {
              value: formState.inputs.address.value,
              isValid: true,
            },
            content: {
              value: contentArray,
              isValid: true,
            },
          },
          true
        );

        const formData = new FormData();
        formData.append("header", formState.inputs.header.value);
        for (let i = 0; i < formState.inputs.images.value.length; i++) {
          formData.append("images", formState.inputs.images.value[i]);
        }

        formData.append("headerText", formState.inputs.headerText.value);

        formData.append("headImage", formState.inputs.headImage.value);

        formData.append("isHomePage", formState.inputs.isHomePage.value);

        formData.append("isWordingPage", formState.inputs.isWordingPage.value);

        formData.append("address", formState.inputs.address.value);
        formData.append("content", JSON.stringify(contentArray));
        formData.append("creator", authCtx.userId);

        await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/articles/",
          "POST",
          formData,
          { Authorization: "Bearer " + authCtx.token }
        );
      } catch (error) {}
    } else {
    }
  };

  const onAddPeragraph = (event) => {
    event.preventDefault();
    if (!formState.inputs.content) {
      setFormData(
        {
          ...formState.inputs,
          content: {
            value: [
              {
                sub: {
                  value: "",
                  isValid: true,
                },
                text: {
                  value: "",
                  isValid: true,
                },
              },
            ],
            isValid: true,
          },
        },
        false
      );
    } else {
      formState.inputs.content.value.push({
        sub: {
          value: "",
          isValid: true,
        },
        text: {
          value: "",
          isValid: true,
        },
      });
    }

    const newArray = [...peragraphNum, peragraphNum.length];
    setPeragraphNum(newArray);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <form onSubmit={onSubmitHandler}>
          <Input
            element="input"
            id="header"
            label="כותרת"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element="textarea"
            id="headerText"
            label="כיתוב תחת כותרת"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <ImageUpload
            id="headImage"
            onInput={inputHandler}
            errorText="תמונה לעמוד ראשי"
            center
          />
          <ImageUpload
            multiple
            id="images"
            onInput={inputHandler}
            errorText="תמונות לכתבה"
            center
          />

          {peragraphNum.map((pragraph, i) => {
            return (
              <div key={`sub${i}`}>
                <Input
                  element="input"
                  id={`sub${i}`}
                  label="כותרת משנה"
                  type="text"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MINLENGTH(0)]}
                />
                <Input
                  element="textarea"
                  id={`text${i}`}
                  label="כתבה"
                  type="text"
                  onInput={inputHandler}
                  validators={[VALIDATOR_MINLENGTH(0)]}
                />
              </div>
            );
          })}

          <Button onClick={onAddPeragraph}>הוסף פסקה</Button>
          <Input
            element="input"
            id="address"
            label="כתובת לכתבה"
            type="text"
            value="/article/"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
          ></Input>
          <Select
            options={[
              { text: "נכון", value: true },
              { text: "לא נכון", value: false },
            ]}
            id="isHomePage"
            label=":?להציג במסך הבית"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Select
            options={[
              { text: "נכון", value: true },
              { text: "לא נכון", value: false },
            ]}
            id="isWordingPage"
            label=":?להציג בסוגי אותיות"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <Button type="submit" disabled={!formState.isValid}>
            הוסף כתבה
          </Button>
        </form>
      )}
    </Fragment>
  );
};
export default NewArticle;
