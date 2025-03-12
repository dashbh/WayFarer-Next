export const MFE_BASE_URLS: any = {
  wayfarer_mfe_home:
    process.env.NEXT_PUBLIC_HOME_URL || "http://localhost:3000",
  wayfarer_mfe_catalog:
    process.env.NEXT_PUBLIC_CATALOG_URL || "http://localhost:3001",
  wayfarer_mfe_blog:
    process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3002",
};

export const NAV_LINKS = [
  { label: "Home", path: "/", mfe: "wayfarer_mfe_home" },
  { label: "Explore", path: "/explore", mfe: "wayfarer_mfe_catalog" },
  { label: "Blog", path: "/blog", mfe: "wayfarer_mfe_catalog" },
];
