export const selectTranslator = (option) => {
  let marble;
  switch (option) {
    case "חברון":
      marble = "hevron";
      break;

    case "טורקי":
      marble = "turki";
      break;

    case "גרניט שחור":
      marble = "black-granite";
      break;

    case "גרניט סרדו חום":
      marble = "brown-granite";
      break;

    case "גרניט סרדו אפור":
      marble = "-granite";
      break;

    case "גרניט אורז":
      marble = "-granite";
      break;

    case "גרניט אדום":
      marble = "-granite";
      break;

    case "גרניט רייזן בלו":
      marble = "-granite";
      break;

    case "גרניט ירוק":
      marble = "-granite";
      break;

    case "אבן סלייב":
      marble = "hevron";
      break;

    case "סלע טבעי":
      marble = "hevron";
      break;

    default:
      break;
  }

  return marble;
};
