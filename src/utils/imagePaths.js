// Utility to build likely local image paths from product names/brands
export function buildLocalImageCandidates(product) {
  if (!product) return [];
  const nameSlug = (product.name || '')
    .toLowerCase()
    .replace(/\((.*?)\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const brandSlug = (product.brand || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const category = (product.category || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const base = '/images'; // served from public/images
  const candidates = [];
  if (nameSlug) {
    candidates.push(`${base}/${nameSlug}.jpg`);
    candidates.push(`${base}/${nameSlug}.jpeg`);
    candidates.push(`${base}/${nameSlug}.png`);
    candidates.push(`${base}/${nameSlug}.webp`);
    candidates.push(`${base}/${nameSlug}.avif`);
  }
  if (brandSlug && nameSlug) {
    candidates.push(`${base}/${brandSlug}-${nameSlug}.jpg`);
    candidates.push(`${base}/${brandSlug}-${nameSlug}.png`);
    candidates.push(`${base}/${brandSlug}-${nameSlug}.webp`);
  }
  // Category-level defaults (drop a single file per category)
  if (category) {
    candidates.push(`${base}/${category}.jpg`);
    candidates.push(`${base}/${category}.png`);
    candidates.push(`${base}/${category}.webp`);
    candidates.push(`${base}/${category}.avif`);
  }

  return candidates;
}


