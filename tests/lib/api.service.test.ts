import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock $fetch
const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);

// Import after mocking
import { apiService } from "~/lib/api.service";

describe("apiService", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("get", () => {
    it("should make GET request to the correct endpoint", async () => {
      const mockData = { id: 1, title: "Test" };
      mockFetch.mockResolvedValueOnce(mockData);

      const result = await apiService.get<typeof mockData>("/posts");

      // Note: In test environment, apiBase is empty so just endpoint is passed
      expect(mockFetch).toHaveBeenCalledWith("/posts");
      expect(result).toEqual(mockData);
    });
  });

  describe("getBySlug", () => {
    it("should make GET request with slug", async () => {
      const mockData = { slug: "test-post", content: "Hello" };
      mockFetch.mockResolvedValueOnce(mockData);

      const result = await apiService.getBySlug<typeof mockData>("/posts", "test-post");

      expect(mockFetch).toHaveBeenCalledWith("/posts/test-post");
      expect(result).toEqual(mockData);
    });
  });

  describe("getStoryBySlug", () => {
    it("should build correct URL with pagination", async () => {
      const mockData = { data: [], meta: { page: 2 } };
      mockFetch.mockResolvedValueOnce(mockData);

      const result = await apiService.getStoryBySlug<typeof mockData>("/stories", "my-story", "newest", 2);

      expect(mockFetch).toHaveBeenCalledWith("/stories/my-story/newest?page=2");
      expect(result).toEqual(mockData);
    });

    it("should work without pagination", async () => {
      const mockData = { data: [] };
      mockFetch.mockResolvedValueOnce(mockData);

      await apiService.getStoryBySlug<typeof mockData>("/stories", "my-story", "newest");

      expect(mockFetch).toHaveBeenCalledWith("/stories/my-story/newest");
    });
  });

  describe("post", () => {
    it("should make POST request with payload", async () => {
      const payload = { name: "Test", email: "test@test.com" };
      const mockResponse = { success: true, message: "Created" };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await apiService.post<typeof mockResponse>("/subscribe", payload);

      expect(mockFetch).toHaveBeenCalledWith("/subscribe", {
        method: "POST",
        body: payload,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle errors with proper rejection", async () => {
      const fetchError = {
        data: { message: "Validation failed" },
      };
      mockFetch.mockRejectedValueOnce(fetchError);

      await expect(apiService.post("/subscribe", {})).rejects.toEqual({
        data: "Validation failed",
      });
    });
  });
});
