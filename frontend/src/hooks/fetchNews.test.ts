import { describe, it, expect, beforeEach } from "@jest/globals";
import { mockFetch, reply, installFetch } from "../test/fetchStub";
import { fetchNews } from "../../../shared/hooks/useNewsCore";

const story = {
  headline: "Glaciers retreat faster than forecast",
  description: "A blue ice wall cracking into a grey sea under low clouds",
  image_url: "https://res.cloudinary.com/demo/image/upload/glacier.png",
};

beforeEach(() => {
  installFetch();
});

describe("fetchNews", () => {
  it("reads the stored story from the API in static mode", async () => {
    mockFetch.mockReturnValue(reply({ getActiveNews: story }));
    await expect(fetchNews("static", "https://api.test/api/v1/news")).resolves.toEqual(story);
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/api/v1/news", expect.objectContaining({ method: "POST" }));
  });

  it("runs the workflow through the API in dynamic mode and accepts n8n's camelCase imageUrl", async () => {
    mockFetch.mockReturnValue(reply({ headline: story.headline, description: story.description, imageUrl: story.image_url }));
    await expect(fetchNews("dynamic", "https://api.test/api/v1/news")).resolves.toEqual(story);
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/api/v1/workflow", expect.anything());
  });

  it("shows the API's message, such as the rate limit", async () => {
    mockFetch.mockReturnValue(reply({ error: "You have run the workflow 3 times this hour." }, 429));
    await expect(fetchNews("dynamic", "https://api.test/api/v1/news")).rejects.toThrow("3 times this hour");
  });

  it("falls back to the status when the error has no message", async () => {
    mockFetch.mockReturnValue(reply({}, 502));
    await expect(fetchNews("static", "https://api.test/api/v1/news")).rejects.toThrow("status: 502");
  });
});
