import { MetadataRoute } from "next";
import { getAllProperties } from "@/data/properties";
import { seoPagesData } from "@/data/seo-pages";
import { all13Tools } from "@/data/tools";
import { siteConfig } from "@/config/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // 1. Static Base Routes
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
    "/valuation",
    "/post-property",
    "/builders",
    "/property-in-ahmedabad",
    "/property-in-gandhinagar",
    "/map",
    "/terms",
    "/privacy",
    "/blog/rera-gujarat-guide",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. 13 Tool & Calculator Pages
  const toolRoutes = all13Tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 3. Slugged Property Routes
  const properties = getAllProperties();
  const propertyRoutes = properties.map((p) => ({
    url: `${baseUrl}/property/${p.slug || p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // 4. 546 Programmatic SEO Locality Routes (Ordered by Priority)
  const sortedSeoPages = [...seoPagesData].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") return -1;
    if (a.priority !== "High" && b.priority === "High") return 1;
    return 0;
  });

  const seoPageRoutes = sortedSeoPages.map((page) => ({
    url: `${baseUrl}${page.slug.endsWith('/') ? page.slug.slice(0, -1) : page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.priority === "High" ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...toolRoutes, ...propertyRoutes, ...seoPageRoutes];
}
