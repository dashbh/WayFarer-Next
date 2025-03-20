import { Metadata } from "next";

export const generateAboutMetadata = (): Metadata => ({
    title: "About WayFarer - Our Story & Mission",
    description: "Learn about WayFarer, our mission, and how we aim to transform online shopping.",
    keywords: "WayFarer, About WayFarer, WayFarer team, WayFarer mission",
    openGraph: {
      title: "About WayFarer",
      description: "Discover the journey of WayFarer and our vision for the future.",
      url: `${process.env.NEXT_PUBLIC_HOME_URL}/about`,
      type: "website",
    },
});
