import { Metadata } from "next";

export const generateContactMetadata = (): Metadata => ({
  title: "Contact Us - WayFarer",
  description:
    "Get in touch with WayFarer for support, inquiries, and collaborations.",
  keywords: "WayFarer contact, support, customer service, help center",
  openGraph: {
    title: "Contact WayFarer",
    description: "Reach out to us for any assistance or inquiries.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    type: "website",
  },
});
