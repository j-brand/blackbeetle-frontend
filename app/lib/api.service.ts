import type { FetchError } from "ofetch";
import type { IApiResponse, IPaginatedResponse } from "@/types";

const API_PREFIX = "/api/v1";

export const apiService = {
  /**
   * GET request - returns unwrapped data from { data: ... } response
   */
  async get<Result>(endpoint: string): Promise<Result> {
    const response = await $fetch<IApiResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}${endpoint}`
    );
    return response.data;
  },

  /**
   * GET request for paginated collections - returns full pagination response
   */
  async getPaginated<Result>(
    endpoint: string,
    params?: { page?: number; per_page?: number; order?: string; order_by?: string }
  ): Promise<IPaginatedResponse<Result>> {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", params.page.toString());
    if (params?.per_page) query.set("per_page", params.per_page.toString());
    if (params?.order) query.set("order", params.order);
    if (params?.order_by) query.set("order_by", params.order_by);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return await $fetch<IPaginatedResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}${endpoint}${queryString}`
    );
  },

  /**
   * GET single resource by slug - returns unwrapped data
   */
  async getBySlug<Result>(endpoint: string, slug: string): Promise<Result> {
    const response = await $fetch<IApiResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}${endpoint}/${slug}`
    );
    return response.data;
  },

  /**
   * GET story with optional ordering and pagination for posts
   */
  async getStory<Result>(
    slug: string,
    options?: { order?: string; order_by?: string }
  ): Promise<Result> {
    const query = new URLSearchParams();
    if (options?.order) query.set("order", options.order);
    if (options?.order_by) query.set("order_by", options.order_by);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const response = await $fetch<IApiResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}/stories/${slug}${queryString}`
    );
    return response.data;
  },

  /**
   * GET story by ID with optional ordering
   */
  async getStoryById<Result>(
    id: number,
    options?: { order?: string; order_by?: string }
  ): Promise<Result> {
    const query = new URLSearchParams();
    if (options?.order) query.set("order", options.order);
    if (options?.order_by) query.set("order_by", options.order_by);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const response = await $fetch<IApiResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}/stories/id/${id}${queryString}`
    );
    return response.data;
  },

  /**
   * GET paginated story posts
   */
  async getStoryPosts<Result>(
    slug: string,
    options?: { page?: number; per_page?: number; order?: string; order_by?: string }
  ): Promise<IPaginatedResponse<Result>> {
    const query = new URLSearchParams();
    if (options?.page) query.set("page", options.page.toString());
    if (options?.per_page) query.set("per_page", options.per_page.toString());
    if (options?.order) query.set("order", options.order);
    if (options?.order_by) query.set("order_by", options.order_by);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return await $fetch<IPaginatedResponse<Result>>(
      `${useRuntimeConfig().public.apiBase}${API_PREFIX}/stories/${slug}/posts${queryString}`
    );
  },

  /**
   * POST request - returns response with optional data wrapper
   */
  async post<Resource>(endpoint: string, payload: Record<string, unknown>): Promise<Resource> {
    try {
      return await $fetch<Resource>(
        `${useRuntimeConfig().public.apiBase}${API_PREFIX}${endpoint}`,
        {
          method: "POST",
          body: payload,
        }
      );
    } catch (err) {
      const fetchError = err as FetchError;
      return Promise.reject({
        message: fetchError.data?.message,
        errors: fetchError.data?.errors,
      });
    }
  },
};
