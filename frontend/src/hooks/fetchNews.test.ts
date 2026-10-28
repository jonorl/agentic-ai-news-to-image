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
    await expect(fetchNews("static", "https://api.test/news", "https://n8n.test/hook")).resolves.toEqual(story);
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/news", expect.objectContaining({ method: "POST" }));
  });

  it("runs the n8n webhook in dynamic mode and accepts its camelCase imageUrl", async () => {
    mockFetch.mockReturnValue(reply({ headline: story.headline, description: story.description, imageUrl: story.image_url }));
    await expect(fetchNews("dynamic", "https://api.test/news", "https://n8n.test/hook")).resolves.toEqual(story);
    expect(mockFetch).toHaveBeenCalledWith("https://n8n.test/hook", expect.anything());
  });

  it("throws with the status when the server answers with an error", async () => {
    mockFetch.mockReturnValue(reply({ error: "boom" }, 502));
    await expect(fetchNews("static", "https://api.test/news", "")).rejects.toThrow("status: 502");
  });
});
