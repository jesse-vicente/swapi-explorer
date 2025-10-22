import "@testing-library/jest-dom";

import {
  fetch as crossFetch,
  Headers as CrossHeaders,
  Request as CrossRequest,
  Response as CrossResponse,
} from "cross-fetch";

if (!globalThis.fetch) {
  globalThis.fetch = crossFetch;
  globalThis.Headers = CrossHeaders;
  globalThis.Request = CrossRequest;
  globalThis.Response = CrossResponse;
}
