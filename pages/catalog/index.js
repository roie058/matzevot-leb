import styles from "../../styles/Catalog.module.css";
import CatalogCard from "../../components/UI/CatalogCard";
const Catalog = () => {
  return (
    <section className={styles.hero_section}>
      <div className={styles.card_grid}>
        <CatalogCard
          link="hevron"
          bg="hevron.jpg"
          category="קטלוג"
          heading="מצבות מאבן חברון"
        />
        <CatalogCard
          link="turki"
          bg="turki.jpg"
          category="קטלוג"
          heading="מצבות משיש טורקי"
        />
        <CatalogCard
          link="black-granite"
          bg="black-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט שחור"
        />

        <CatalogCard
          link="brown-granite"
          bg="brown-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט סרדו חום"
        />

        <CatalogCard
          link="gray-granite"
          bg="gray-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט סרדו אפור"
        />

        <CatalogCard
          link="rice-granite"
          bg="rice-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט אורז"
        />

        <CatalogCard
          link="blue-granite"
          bg="blue-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט רייזן בלו"
        />

        <CatalogCard
          link="red-granite"
          bg="red-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט אדום"
        />

        <CatalogCard
          link="green-granite"
          bg="green-granite.jpg"
          category="קטלוג"
          heading="מצבות מגרניט ירוק"
        />

        <CatalogCard
          link="slaybe"
          bg="slaybe.jpg"
          category="קטלוג"
          heading="מצבות מאבן סלייב"
        />

        <CatalogCard
          link="natural"
          bg="natural.jpg"
          category="קטלוג"
          heading="מצבות מסלע טבעי"
        />

        <CatalogCard
          link="doubles"
          bg="doubles.jpg"
          category="קטלוג"
          heading="מצבות זוגיות"
        />
      </div>
    </section>
  );
};

export default Catalog;
