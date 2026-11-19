import { fetchWithCookies } from "./cookies";
import { API_BASE_URL } from "./api";
export const AUTH_STATE_CHANGED_EVENT = "scentjournal:auth-state-changed";

export function notifyAuthStateChanged(isSignedIn: boolean): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent<boolean>(AUTH_STATE_CHANGED_EVENT, {
      detail: isSignedIn,
    }));
  }
}

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignUpDetails = AuthCredentials & {
  username: string;
};

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

async function authRequest(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetchWithCookies(`${API_BASE_URL}/auth/${path}`, init);
  if (!response.ok) {
    const message = await response.text();
    throw new AuthError(
      message || `Authentication request failed (${response.status})`,
      response.status,
    );
  }
  return response;
}

export async function signUp(details: SignUpDetails): Promise<void> {
  await authRequest("signUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
}

export async function signIn(credentials: AuthCredentials): Promise<void> {
  await authRequest("signIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
}

export async function signOut(): Promise<void> {
  await authRequest("signOut", { method: "GET" });
}

export async function getCurrentUser(): Promise<string> {
  const response = await authRequest("me", { method: "GET" });
  return response.json() as Promise<string>;
}
