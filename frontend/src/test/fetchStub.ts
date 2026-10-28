import { jest } from "@jest/globals";

// jsdom has neither fetch nor Response, so tests answer with the two members fetchNews reads.
export const mockFetch = jest.fn<(url: string, init?: RequestInit) => Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }>>();

export const reply = (body: unknown, status = 200) =>
  Promise.resolve({ ok: status >= 200 && status < 300, status, json: async () => body });

export const installFetch = () => {
  globalThis.fetch = mockFetch as unknown as typeof fetch;
};
