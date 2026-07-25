/**
 * Generates an SEO-friendly kebab-case slug for a property based on its title, locality, and city.
 * Handles duplicate collisions by appending incremental suffixes (-2, -3, etc.).
 */
export function generateSlug(title: string, locality: string = "", city: string = "", existingSlugs: string[] = []): string {
  const baseRaw = `${title} ${locality} ${city}`
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const base = baseRaw || "property";

  if (!existingSlugs.includes(base)) {
    return base;
  }

  let counter = 2;
  while (existingSlugs.includes(`${base}-${counter}`)) {
    counter++;
  }

  return `${base}-${counter}`;
}
