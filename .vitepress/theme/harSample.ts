import type { OARequest } from 'vitepress-openapi/client';

/**
 * A HAR (HTTP Archive) request, built straight from the fields vitepress-openapi
 * already resolved for an operation's Playground — the same data its own curl/
 * JS/PHP/Python samples are generated from, just serialized differently.
 *
 * HAR is the one format both Postman and Insomnia import directly (File →
 * Import → a .har file), so this is the "take it to your own client" escape
 * hatch: copy the sample, save it with a .har extension, import it.
 */
export function buildHarSample(request: OARequest): string {
  const headers = Object.entries(request.headers || {}).map(([name, value]) => ({
    name,
    value: String(value),
  }));

  const queryString = Object.entries(request.query || {}).flatMap(([name, value]) =>
    (Array.isArray(value) ? value : [value]).map((v) => ({ name, value: String(v) })),
  );

  const hasBody = request.body !== undefined && request.body !== null;

  // FormData (file uploads, e.g. "Upload documents") has no enumerable own
  // properties — JSON.stringify(someFormData) always returns "{}", silently
  // dropping every field and file. Build HAR's own multipart shape instead:
  // one `params` entry per field, with fileName/contentType for File values.
  const isFormData = typeof FormData !== 'undefined' && request.body instanceof FormData;
  let postData: { mimeType: string; text?: string; params?: Array<Record<string, string>> } | undefined;

  if (isFormData) {
    const params = Array.from(request.body as FormData).map(([name, value]) =>
      value instanceof File
        ? { name, value: 'BINARY', fileName: value.name, contentType: value.type || 'application/octet-stream' }
        : { name, value: String(value) },
    );
    postData = { mimeType: request.contentType || 'multipart/form-data', params };
  } else if (hasBody) {
    const bodyText = typeof request.body === 'string' ? request.body : JSON.stringify(request.body);
    postData = { mimeType: request.contentType || 'application/json', text: bodyText };
  }

  const har = {
    log: {
      version: '1.2',
      creator: { name: 'Exto Docs', version: '1.0' },
      entries: [
        {
          startedDateTime: new Date().toISOString(),
          request: {
            method: request.method,
            url: request.url.toString(),
            httpVersion: 'HTTP/1.1',
            cookies: [],
            headers,
            queryString,
            headersSize: -1,
            bodySize: -1,
            ...(postData ? { postData } : {}),
          },
          response: {
            status: 0,
            statusText: '',
            httpVersion: 'HTTP/1.1',
            cookies: [],
            headers: [],
            content: { size: 0, mimeType: 'application/json' },
            redirectURL: '',
            headersSize: -1,
            bodySize: -1,
          },
          cache: {},
          timings: { send: 0, wait: 0, receive: 0 },
        },
      ],
    },
  };

  return JSON.stringify(har, null, 2);
}
