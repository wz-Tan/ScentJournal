import { API_BASE_URL } from "./api";

/** Check whether the API accepts the browser's HttpOnly auth cookie. */
export async function cookieExists(): Promise<boolean> {
  try {
    const response = await fetchWithCookies(`${API_BASE_URL}/auth/me`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Include browser-managed cookies (including HttpOnly auth cookies) in API
 * requests. The cookie itself cannot be read from client-side JavaScript.
 */
export function fetchWithCookies(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(input, {
    ...init,
    credentials: "include",
  });
}
