export function getBrandBadgeDataUri(product) {
  const brand = (product?.brand || 'Product').toString();
  const category = (product?.category || '').toString();
  const bg = category.includes('laptop')
    ? '#0d6efd'
    : category.includes('tablet')
    ? '#20c997'
    : category.includes('phone') || category.includes('smart')
    ? '#6f42c1'
    : '#495057';
  const text = `${brand}`;
  const label = category ? `${category}` : '';
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bg}" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#111" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Segoe UI, Roboto, Arial" font-size="48" fill="#fff" font-weight="700">${text}</text>
  ${label ? `<text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-family="Segoe UI, Roboto, Arial" font-size="20" fill="#e9ecef">${label}</text>` : ''}
 </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}


