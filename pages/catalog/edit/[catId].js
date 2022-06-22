import { useRouter } from "next/router";
import { useForm } from "../../../lib/hooks/form-hook";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import { VALIDATOR_REQUIRE } from "../../../components/util/validators";
import Select from "../../../components/UI/Select";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import ErrorModal from "../../../components/UI/ErrorModal";
import { useHttp } from "../../../lib/hooks/http-hook";
import { useEffect, useState, Fragment, useContext } from "react";
import ImageUpload from "../../../components/UI/ImageUpload";
import { AuthContext } from "../../../lib/context/auth-context";

const EditCatalog = () => {
  const [formState, inputHandler, setFormData] = useForm(
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
      catalogId: {
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
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const router = useRouter();
  const { catId } = router.query;
  const [loadedCatalog, setLoadedCatalog] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await sendRequest(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog/${catId}`
        );
        setLoadedCatalog(data.catalog);
        setFormData(
          {
            marble: {
              value: data.catalog.marble,
              isValid: true,
            },
            type: {
              value: data.catalog.type,
              isValid: true,
            },
            image: {
              value: data.catalog.image,
              isValid: true,
            },
            catalogId: {
              value: data.catalog.catalogId,
              isValid: true,
            },
            description: {
              value: data.catalog.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchCatalog();
  }, [sendRequest, catId, setFormData]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (formState.isValid) {
      try {
        const formData = new FormData();
        formData.append("marble", formState.inputs.marble.value);
        formData.append("type", formState.inputs.type.value);
        formData.append("catalogId", formState.inputs.catalogId.value);
        formData.append("description", formState.inputs.description.value);
        formData.append("image", formState.inputs.image.value);
        await sendRequest(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog/${catId}`,
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

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedCatalog && (
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
            value={loadedCatalog.marble}
            valid={true}
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
            value={loadedCatalog.type}
            valid={true}
          />

          <ImageUpload
            id="image"
            onInput={inputHandler}
            errorText="בחר תמונה בבקשה"
            center
            image={loadedCatalog.image.replace(/\\/g, "/")}
          />
          <Input
            element="input"
            id="catalogId"
            label="מספר קטלוג"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            value={loadedCatalog.catalogId}
            valid={true}
          />
          <Input
            element="textarea"
            id="description"
            label="פירוט"
            type="text"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            value={loadedCatalog.description}
            valid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            הוסף לקטלוג
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default EditCatalog;
