export const generateHomeJsonLD = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: process.env.NEXT_PUBLIC_HOME_URL,
  name: "WayFarer",
  potentialAction: {
    "@type": "SearchAction",
    target: `${process.env.NEXT_PUBLIC_HOME_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
