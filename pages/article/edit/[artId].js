import { useRouter } from "next/router";
import { useForm } from "../../../lib/hooks/form-hook";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../components/util/validators";
import Select from "../../../components/UI/Select";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import ErrorModal from "../../../components/UI/ErrorModal";
import { useHttp } from "../../../lib/hooks/http-hook";
import { useEffect, useState, Fragment, useContext } from "react";
import ImageUpload from "../../../components/UI/ImageUpload";
import { AuthContext } from "../../../lib/context/auth-context";

const EditArticle = () => {
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
        value: true,
        isValid: false,
      },
      isHomePage: {
        value: true,
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const router = useRouter();
  const { artId } = router.query;
  const [loadedArticle, setLoadedArticle] = useState();
  const [peragraphNum, setPeragraphNum] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await sendRequest(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${artId}`
        );
        setLoadedArticle(data.article);
        setPeragraphNum(data.article.content);
        console.log(data.article);
        setFormData(
          {
            header: {
              value: data.article.header,
              isValid: true,
            },
            headerText: {
              value: data.article.headerText,
              isValid: true,
            },
            images: {
              value: data.article.images,
              isValid: true,
            },
            headImage: {
              value: data.article.headImage,
              isValid: true,
            },
            isWordingPage: {
              value: data.article.isWordingPage,
              isValid: true,
            },
            isHomePage: {
              value: data.article.isHomePage,
              isValid: true,
            },
            address: {
              value: data.article.address,
              isValid: true,
            },
            content: {
              value: data.article.content,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchArticle();
  }, [sendRequest, artId, setFormData]);

  const onSubmitHandler = async (event) => {
    console.log(formState);
    event.preventDefault();

    if (formState.isValid) {
      try {
        let contentArray = [];

        for (let index = 0; index < peragraphNum.length; index++) {
          const subName = `sub${index}`;
          const textName = `text${index}`;

          const pushObject = {
            sub: formState.inputs[subName].value,
            text: formState.inputs[textName].value,
          };
          contentArray.push(pushObject);
        }
        console.log(formState.isValid);

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
        console.log(formState.inputs.images.value);
        console.log(contentArray);

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

        await sendRequest(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles/${artId}`,
          "PATCH",
          formData,
          {
            Authorization: "Bearer " + authCtx.token,
          }
        );
      } catch (error) {}
    } else {
    }
  };

  const onAddPeragraph = (event) => {
    event.preventDefault();
    if (!formState.inputs.content.value) {
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
      let newArray = [...peragraphNum];
      newArray.push(newArray.length);
      setPeragraphNum(newArray);
      console.log(peragraphNum);
    }
  };

  let images;

  if (loadedArticle && loadedArticle.images[0] !== undefined) {
    images = loadedArticle.images[0].replace(/\\/g, "/");
  } else {
    images = null;
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedArticle && (
        <form onSubmit={onSubmitHandler}>
          <Input
            element="input"
            id="header"
            label="כותרת"
            type="text"
            value={loadedArticle.header}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element="textarea"
            id="headerText"
            label="כיתוב תחת כותרת"
            type="text"
            value={loadedArticle.headerText}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <ImageUpload
            id="headImage"
            onInput={inputHandler}
            errorText="תמונה לעמוד ראשי"
            center
            image={loadedArticle.headImage.replace(/\\/g, "/")}
          />
          <ImageUpload
            multiple
            id="images"
            onInput={inputHandler}
            errorText="תמונות לכתבה"
            center
            image={images}
          />

          {peragraphNum &&
            peragraphNum.map((pragraph, i) => {
              return (
                <div key={`sub${i}`}>
                  <Input
                    element="input"
                    id={`sub${i}`}
                    label="כותרת משנה"
                    type="text"
                    value={pragraph.sub}
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(0)]}
                  />
                  <Input
                    element="textarea"
                    id={`text${i}`}
                    label="כתבה"
                    value={pragraph.text}
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
            value={loadedArticle.address}
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
            value={loadedArticle.isHomePage}
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
            value={loadedArticle.isWordingPage}
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <Button type="submit" disabled={!formState.isValid}>
            הוסף למאמרים
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default EditArticle;
