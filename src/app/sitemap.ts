import { MetadataRoute } from "next";
import { initialProperties } from "@/data/properties";
import { siteConfig } from "@/config/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/commercial",
    "/pg",
    "/plots",
    "/land",
    "/pricing",
    "/requirements",
    "/post-property",
    "/terms",
    "/privacy",
    "/blog/rera-gujarat-guide",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const localityRoutes = siteConfig.primaryLocalities.map((loc) => ({
    url: `${baseUrl}/properties-in-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const dynamicPropertyRoutes = initialProperties.map((p) => ({
    url: `${baseUrl}/property/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...localityRoutes, ...dynamicPropertyRoutes];
}
