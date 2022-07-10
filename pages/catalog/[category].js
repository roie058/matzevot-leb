import Card from "../../components/UI/Card";
import styles from "../../styles/CatalogSelect.module.css";
import { useRouter } from "next/router";

import { Fragment, useContext } from "react";
import { AuthContext } from "../../lib/context/auth-context";

import { httpHandlr } from "../../lib/httpHandler";

import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() =>
  import("../../components/UI/ErrorModal")
);

const { sendRequest, error, clearError } = httpHandlr();

const CatalogSelect = (props) => {
  const router = useRouter();
  const params = router.query;
  const loadedCatalog = props.loadedCatalog;
  const authCtx = useContext(AuthContext);

  let filter;

  return (
    <Fragment>
      <DynamicErrorModal error={error} onClear={clearError} />

      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "סטנדרט"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות סטנדרט</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        edit={tomb.id}
                        id={tomb.catalogId}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "כפולה"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות כפולות</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "מכפלה"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות זוגיות</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "גוש"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>גושים</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "מסד"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות עם מסד</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "סנהדרין"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות סנהדרין</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {loadedCatalog && (
        <div>
          {(filter = loadedCatalog.filter(
            (tumb) => tumb.marble === params.category && tumb.type === "מיוחדת"
          )).length > 0 && (
            <div>
              <h3 className={styles.header}>מצבות מיוחדות</h3>
              <div className={styles.wrapper}>
                <div className={styles.cols}>
                  {filter.map((tomb) => {
                    return (
                      <Card
                        key={tomb.catalogId}
                        id={tomb.catalogId}
                        edit={tomb.id}
                        image={tomb.image}
                        description={tomb.description}
                        isAdmin={authCtx.isAdmin}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          category: "hevron",
        },
      },
      {
        params: {
          category: "turki",
        },
      },
      {
        params: {
          category: "black-granite",
        },
      },
      {
        params: {
          category: "brown-granite",
        },
      },
      {
        params: {
          category: "gray-granite",
        },
      },
      {
        params: {
          category: "red-granite",
        },
      },
      {
        params: {
          category: "green-granite",
        },
      },
      {
        params: {
          category: "blue-granite",
        },
      },
      {
        params: {
          category: "natural",
        },
      },
      {
        params: {
          category: "rice-granite",
        },
      },
      {
        params: {
          category: "slaybe",
        },
      },
      {
        params: {
          category: "doubles",
        },
      },
    ],
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps() {
  const data = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/catalog"
  );

  return {
    props: {
      loadedCatalog: data.catalog,
      error,
    },
    revalidate: 1000,
  };
}

export default CatalogSelect;
