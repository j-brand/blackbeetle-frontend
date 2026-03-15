import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock $fetch
const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);

// Import after mocking
import { apiService } from "~/lib/api.service";

// In the Nuxt test environment, useRuntimeConfig().public.apiBase is empty string
const API_PREFIX = "/api/v1";

describe("apiService", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("get", () => {
    it("should make GET request and unwrap data", async () => {
      const mockData = [{ id: 1, title: "Story 1" }];
      mockFetch.mockResolvedValueOnce({ data: mockData });

      const result = await apiService.get<typeof mockData>("/stories");

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/stories`);
      expect(result).toEqual(mockData);
    });
  });

  describe("getPaginated", () => {
    it("should make GET request with pagination params", async () => {
      const mockResponse = {
        data: [{ id: 1 }],
        links: { first: null, last: null, prev: null, next: null },
        meta: { current_page: 2, per_page: 10, total: 50 },
      };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await apiService.getPaginated("/albums", { page: 2, per_page: 10 });

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/albums?page=2&per_page=10`);
      expect(result).toEqual(mockResponse);
    });

    it("should make GET request without params", async () => {
      const mockResponse = { data: [], links: {}, meta: {} };
      mockFetch.mockResolvedValueOnce(mockResponse);

      await apiService.getPaginated("/albums");

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/albums`);
    });

    it("should include order params when provided", async () => {
      mockFetch.mockResolvedValueOnce({ data: [], links: {}, meta: {} });

      await apiService.getPaginated("/albums", { order: "desc", order_by: "date" });

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/albums?order=desc&order_by=date`);
    });
  });

  describe("getBySlug", () => {
    it("should make GET request with slug and unwrap data", async () => {
      const mockData = { slug: "test-album", title: "Test" };
      mockFetch.mockResolvedValueOnce({ data: mockData });

      const result = await apiService.getBySlug<typeof mockData>("/albums", "test-album");

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/albums/test-album`);
      expect(result).toEqual(mockData);
    });
  });

  describe("getStory", () => {
    it("should make GET request for story by slug", async () => {
      const mockData = { id: 1, title: "Journey", slug: "journey" };
      mockFetch.mockResolvedValueOnce({ data: mockData });

      const result = await apiService.getStory<typeof mockData>("journey");

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/stories/journey`);
      expect(result).toEqual(mockData);
    });

    it("should include ordering options", async () => {
      mockFetch.mockResolvedValueOnce({ data: {} });

      await apiService.getStory("journey", { order: "desc", order_by: "date" });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_PREFIX}/stories/journey?order=desc&order_by=date`
      );
    });
  });

  describe("getStoryById", () => {
    it("should make GET request for story by ID", async () => {
      const mockData = { id: 42, title: "Journey" };
      mockFetch.mockResolvedValueOnce({ data: mockData });

      const result = await apiService.getStoryById<typeof mockData>(42);

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/stories/id/42`);
      expect(result).toEqual(mockData);
    });

    it("should include ordering options", async () => {
      mockFetch.mockResolvedValueOnce({ data: {} });

      await apiService.getStoryById(42, { order: "asc", order_by: "position" });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_PREFIX}/stories/id/42?order=asc&order_by=position`
      );
    });
  });

  describe("getStoryPosts", () => {
    it("should make GET request for story posts", async () => {
      const mockResponse = { data: [{ id: 1, type: "html" }], links: {}, meta: {} };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await apiService.getStoryPosts("journey");

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/stories/journey/posts`);
      expect(result).toEqual(mockResponse);
    });

    it("should include pagination and ordering params", async () => {
      mockFetch.mockResolvedValueOnce({ data: [], links: {}, meta: {} });

      await apiService.getStoryPosts("journey", {
        page: 3,
        per_page: 5,
        order: "desc",
        order_by: "date",
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `${API_PREFIX}/stories/journey/posts?page=3&per_page=5&order=desc&order_by=date`
      );
    });
  });

  describe("post", () => {
    it("should make POST request with payload", async () => {
      const payload = { name: "Test", content: "Hello" };
      const mockResponse = { success: true };
      mockFetch.mockResolvedValueOnce(mockResponse);

      const result = await apiService.post<typeof mockResponse>("/comments", payload);

      expect(mockFetch).toHaveBeenCalledWith(`${API_PREFIX}/comments`, {
        method: "POST",
        body: payload,
      });
      expect(result).toEqual(mockResponse);
    });

    it("should handle fetch errors with proper rejection format", async () => {
      const fetchError = {
        data: {
          message: "Validation failed",
          errors: { name: ["Name is required"] },
        },
      };
      mockFetch.mockRejectedValueOnce(fetchError);

      await expect(apiService.post("/comments", {})).rejects.toEqual({
        message: "Validation failed",
        errors: { name: ["Name is required"] },
      });
    });

    it("should handle errors without data gracefully", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(apiService.post("/comments", {})).rejects.toEqual({
        message: undefined,
        errors: undefined,
      });
    });
  });

  // =========================================================================
  // Error handling across GET methods
  // =========================================================================
  describe("error handling", () => {
    it("get should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.get("/stories")).rejects.toThrow("Network error");
    });

    it("getPaginated should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.getPaginated("/albums")).rejects.toThrow("Network error");
    });

    it("getBySlug should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.getBySlug("/albums", "test")).rejects.toThrow("Network error");
    });

    it("getStory should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.getStory("journey")).rejects.toThrow("Network error");
    });

    it("getStoryById should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.getStoryById(42)).rejects.toThrow("Network error");
    });

    it("getStoryPosts should propagate network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"));
      await expect(apiService.getStoryPosts("journey")).rejects.toThrow("Network error");
    });

    it("get should handle null data response", async () => {
      mockFetch.mockResolvedValueOnce({ data: null });
      const result = await apiService.get("/stories");
      expect(result).toBeNull();
    });

    it("get should handle undefined data response", async () => {
      mockFetch.mockResolvedValueOnce({ data: undefined });
      const result = await apiService.get("/stories");
      expect(result).toBeUndefined();
    });

    it("post should handle error where fetchError.data is undefined", async () => {
      const err = { data: undefined, message: "Server Error" };
      mockFetch.mockRejectedValueOnce(err);

      await expect(apiService.post("/comments", {})).rejects.toEqual({
        message: undefined,
        errors: undefined,
      });
    });
  });
});
