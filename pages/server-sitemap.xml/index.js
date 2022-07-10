import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/articles`
  );
  const articles = await response.json();

  console.log(articles);
  const fields = articles.map((article) => ({
    loc: `${process.env.NEXT_PUBLIC_BACKEND_URL}${article.address}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function site() {}
