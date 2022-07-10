import ArticlePage from "../../components/pages/ArticlePage";
import { useRouter } from "next/router";

import { Fragment } from "react";

import dynamic from "next/dynamic";

const DynamicErrorModal = dynamic(() =>
  import("../../components/UI/ErrorModal")
);

import { httpHandlr } from "../../lib/httpHandler";
const { sendRequest, error, clearError } = httpHandlr();

const ArticleContentSelector = (props) => {
  const router = useRouter();
  const params = router.query;

  const loadedArticles = props.loadedArticles;

  return (
    <Fragment>
      <DynamicErrorModal error={props.error} onClear={clearError} />

      {loadedArticles &&
        loadedArticles.map((article) => {
          const address = article.address.split("/");
          if (params.article === address[address.length - 1]) {
            return (
              <ArticlePage
                key={article.id}
                header={article.header}
                headerText={article.headerText}
                img={article.images}
                content={article.content}
              />
            );
          } else {
            return null;
          }
        })}
    </Fragment>
  );
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          article: "text-example",
        },
      },
      {
        params: {
          article: "bronza",
        },
      },
      {
        params: {
          article: "havlata",
        },
      },
      {
        params: {
          article: "granite-art",
        },
      },
      {
        params: {
          article: "spacial",
        },
      },
      {
        params: {
          article: "monuments",
        },
      },
      {
        params: {
          article: "qa",
        },
      },
      {
        params: {
          article: "fonts",
        },
      },
      {
        params: {
          article: "oferet",
        },
      },
      {
        params: {
          article: "animals",
        },
      },
    ],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps() {
  const data = await sendRequest(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/articles"
  );

  return {
    props: {
      loadedArticles: data.articles,
      error,
    },
    revalidate: 1000,
  };
}

export default ArticleContentSelector;
