const ALLOWED_HOSTS = [
  'pokemonalpha.es',
  'pokemon.com',
  'tcgnews.cl'
];

export const MAX_RESPONSE_BYTES = 2_000_000;

function hostMatches(hostname, domain) {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

export function assertSafeUrl(rawUrl) {
  if (typeof rawUrl !== 'string' || rawUrl.length > 2048) {
    throw new Error('Invalid URL');
  }

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error('Invalid URL');
  }

  if (parsed.protocol !== 'https:') {
    throw new Error('Only HTTPS URLs are allowed');
  }

  if (parsed.username || parsed.password) {
    throw new Error('Credentials in URL are not allowed');
  }

  if (parsed.port && parsed.port !== '443') {
    throw new Error('Custom ports are not allowed');
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!ALLOWED_HOSTS.some(domain => hostMatches(hostname, domain))) {
    throw new Error('Host not allowed');
  }

  return parsed;
}

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export async function fetchGuardedText(rawUrl, { timeoutMs = 8000, maxBytes = MAX_RESPONSE_BYTES } = {}) {
  let current = assertSafeUrl(rawUrl);

  for (let hop = 0; hop < 4; hop++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    let response;
    try {
      response = await fetch(current.toString(), {
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Accept: 'text/html,application/xhtml+xml'
        }
      });
    } finally {
      clearTimeout(timeout);
    }

    if (REDIRECT_STATUSES.has(response.status)) {
      const location = response.headers.get('location');
      if (!location) throw new Error('Invalid redirect');
      current = assertSafeUrl(new URL(location, current).toString());
      continue;
    }

    const text = (await response.text()).slice(0, maxBytes);
    return { response, text };
  }

  throw new Error('Too many redirects');
}
