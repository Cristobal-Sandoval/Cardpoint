const ALLOWED_TAGS = new Set([
  'P', 'H2', 'H3', 'H4', 'STRONG', 'B', 'EM', 'I', 'U', 'BR',
  'UL', 'OL', 'LI', 'BLOCKQUOTE', 'A', 'IMG', 'FIGURE', 'FIGCAPTION'
]);

const UNWRAP_TAGS = new Set([
  'DIV', 'SPAN', 'SECTION', 'ARTICLE', 'MAIN', 'HEADER', 'FOOTER', 'ASIDE', 'SMALL'
]);

const DANGEROUS_TAGS = new Set([
  'SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'FORM', 'INPUT', 'BUTTON',
  'TEXTAREA', 'SELECT', 'OPTION', 'LINK', 'META', 'BASE', 'SVG', 'MATH',
  'TEMPLATE', 'NOSCRIPT', 'VIDEO', 'AUDIO', 'SOURCE', 'TRACK', 'CANVAS'
]);

const SAFE_CLASS_TOKEN = /^(?:[a-z0-9-]+:)*(?:text|font|leading|tracking|mt|mb|noti)[a-z0-9-]*$/;

const isSafeClassAttr = (value) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .every(token => token.length <= 64 && SAFE_CLASS_TOKEN.test(token));

const isSafeHref = (value) =>
  /^https?:\/\//i.test(value) || value.startsWith('/') || value.startsWith('#');

const isSafeImageSrc = (value) => /^https:\/\//i.test(value);

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeExternalUrl(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : '';
}

export function sanitizeNewsHtml(html) {
  if (!html || typeof html !== 'string') return '';
  if (typeof DOMParser === 'undefined') return '';

  const doc = new DOMParser().parseFromString(`<div id="sanitize-root">${html}</div>`, 'text/html');
  const root = doc.getElementById('sanitize-root');
  if (!root) return '';

  for (const el of Array.from(root.querySelectorAll('*'))) {
    const tag = el.tagName;

    if (DANGEROUS_TAGS.has(tag)) {
      el.remove();
      continue;
    }

    if (!ALLOWED_TAGS.has(tag)) {
      if (UNWRAP_TAGS.has(tag)) {
        el.replaceWith(...Array.from(el.childNodes));
      } else {
        el.remove();
      }
      continue;
    }

    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();

      if (name === 'class') {
        if (!isSafeClassAttr(attr.value)) el.removeAttribute(attr.name);
        continue;
      }

      if (tag === 'A' && name === 'href') continue;
      if (tag === 'A' && name === 'title') continue;
      if (tag === 'IMG' && (name === 'src' || name === 'alt')) continue;

      el.removeAttribute(attr.name);
    }

    if (tag === 'A') {
      const href = el.getAttribute('href') || '';
      if (!isSafeHref(href)) {
        el.removeAttribute('href');
      } else {
        el.setAttribute('rel', 'noopener noreferrer nofollow');
        el.setAttribute('target', '_blank');
      }
    }

    if (tag === 'IMG') {
      const src = el.getAttribute('src') || '';
      if (!isSafeImageSrc(src)) {
        el.remove();
        continue;
      }
      el.setAttribute('loading', 'lazy');
      el.setAttribute('decoding', 'async');
      el.setAttribute('referrerpolicy', 'no-referrer');
    }
  }

  return root.innerHTML;
}
