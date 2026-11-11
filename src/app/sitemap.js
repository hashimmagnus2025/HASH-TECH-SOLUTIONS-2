import { env } from "@/lib/env";
import { services } from "@/data/services";

const staticRoutes = ["", "/about", "/services", "/products", "/amc-services", "/industries", "/projects", "/contact", "/privacy-policy", "/terms-and-conditions"];
export default function sitemap() {
  const base = env.siteUrl.replace(/\/$/, "");
  const staticEntries = staticRoutes.map(route => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
  const serviceEntries = services.map(service => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  }));
  return [...staticEntries, ...serviceEntries];
}
