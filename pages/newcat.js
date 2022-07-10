import { useForm } from "../lib/hooks/form-hook";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { VALIDATOR_REQUIRE } from "../components/util/validators";
import Select from "../components/UI/Select";
import { useHttp } from "../lib/hooks/http-hook";
import { AuthContext } from "../lib/context/auth-context";
import { useContext, Fragment } from "react";
import ImageUpload from "../components/UI/ImageUpload";
import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() => import("../components/UI/ErrorModal"));
const DynamicLoadingSpinner = dynamic(() =>
  import("../components/UI/LoadingSpinner")
);

const NewCatalog = (props) => {
  const [formState, inputHandler] = useForm(
    {
      marble: {
        value: "",
        isValid: false,
      },
      type: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
      catId: {
        value: "",
        isValid: false,
      },
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
        const formData = new FormData();
        formData.append("marble", formState.inputs.marble.value);
        formData.append("type", formState.inputs.type.value);
        formData.append("catId", formState.inputs.catId.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("creator", authCtx.userId);
        formData.append("image", formState.inputs.image.value);
        await sendRequest(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/catalog/",
          "POST",
          formData,
          { Authorization: "Bearer " + authCtx.token }
        );
      } catch (error) {
        console.log(formState);
      }

      console.log(formState);
    } else {
      console.log(formState);
    }
  };
  return (
    <Fragment>
      <DynamicErrorModal error={error} onClear={clearError} />
      {isLoading && <DynamicLoadingSpinner />}
      {!isLoading && (
        <form onSubmit={onSubmitHandler}>
          <Select
            options={[
              { text: "חברון", value: "hevron" },
              { text: "טורקי", value: "turki" },
              { text: "גרניט שחור", value: "black-granite" },
              { text: "גרניט סרדו חום", value: "brown-granite" },
              { text: "גרניט סרדו אפור", value: "gray-granite" },
              { text: "גרניט אורז", value: "rice-granite" },
              { text: "גרניט רייזן בלו", value: "blue-granite" },
              { text: "גרניט אדום", value: "red-granite" },
              { text: "גרניט ירוק", value: "green-granite" },
              { text: "אבן סלייב", value: "slaybe" },
              { text: "סלע טבעי", value: "natural" },
            ]}
            id="marble"
            label=":סוג השיש"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Select
            options={[
              { text: "סטנדרט", value: "סטנדרט" },
              { text: "כפולה", value: "כפולה" },
              { text: "מכפלה", value: "מכפלה" },
              { text: "גוש", value: "גוש" },
              { text: "מסד", value: "מסד" },
              { text: "סנהדרין", value: "סנהדרין" },
              { text: "מיוחדת", value: "מיוחדת" },
            ]}
            id="type"
            label=":סוג המצבה"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="בחר תמונה בבקשה"
            center
          />
          <Input
            element="input"
            id="catId"
            label="מספר קטלוג"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
          <Input
            element="textarea"
            id="description"
            label="פירוט"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />

          <Button type="submit" disabled={!formState.isValid}>
            הוסף לקטלוג
          </Button>
        </form>
      )}
    </Fragment>
  );
};
export default NewCatalog;
