// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shipraseeds.com",
      lastModified: new Date().toISOString(),
    },
      {
      url: "https://shipraseeds.com/products",
      lastModified: new Date().toISOString(),
    },
      {
      url: "https://shipraseeds.com/about",
      lastModified: new Date().toISOString(),
    },
  ];
}
