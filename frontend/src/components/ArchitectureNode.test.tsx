import { describe, it, expect, beforeEach } from "@jest/globals";
import { mockFetch, reply, installFetch } from "../test/fetchStub";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArchitectureNodes } from "./ArchitectureNode";

// Babel rewrites import.meta.env to process.env under Jest; the app tsconfig carries no Node types.
declare const process: { env: Record<string, string | undefined> };

const stored = {
  headline: "Glaciers retreat faster than forecast",
  description: "A blue ice wall cracking into a grey sea under low clouds",
  image_url: "https://res.cloudinary.com/demo/image/upload/glacier.png",
};

beforeEach(() => {
  process.env.VITE_BACKEND = "https://api.test/api/v1/news";
  process.env.VITE_WEBHOOK = "https://n8n.test/webhook/abc";
  installFetch();
});

describe("ArchitectureNodes live demo", () => {
  it("shows the stored story on load", async () => {
    mockFetch.mockReturnValue(reply({ getActiveNews: stored }));
    render(<ArchitectureNodes />);

    expect(await screen.findByRole("img", { name: stored.headline })).toHaveAttribute("src", stored.image_url);
    expect(screen.getByText(stored.description)).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledWith("https://api.test/api/v1/news", expect.anything());
  });

  it("runs the workflow through the webhook on request", async () => {
    const user = userEvent.setup();
    mockFetch.mockReturnValueOnce(reply({ getActiveNews: stored }));
    render(<ArchitectureNodes />);
    await screen.findByRole("img", { name: stored.headline });

    const fresh = { headline: "Fresh headline", description: "Fresh scene", image_url: "https://res.cloudinary.com/demo/new.png" };
    mockFetch.mockReturnValueOnce(reply(fresh));
    await user.click(screen.getByRole("button", { name: "Run Workflow" }));

    expect(await screen.findByRole("img", { name: "Fresh headline" })).toBeInTheDocument();
    expect(mockFetch).toHaveBeenLastCalledWith("https://n8n.test/webhook/abc", expect.anything());
    expect(screen.getByText("Live workflow execution in progress")).toBeInTheDocument();
  });

  it("shows the error when the API is down", async () => {
    mockFetch.mockReturnValue(reply({}, 503));
    render(<ArchitectureNodes />);
    expect(await screen.findByText("HTTP error! status: 503")).toBeInTheDocument();
  });
});
