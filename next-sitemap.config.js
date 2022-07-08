const siteUrl = "https://matzevot-leb.vercel.app";

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/auth" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },

  exclude: ["/auth"],
};
