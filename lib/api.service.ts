import type { FetchError } from "ofetch";

export const apiService = {
  async get<Result>(endpoint: string): Promise<Result> {
    return await $fetch<Result>(`${useRuntimeConfig().public.apiBase}${endpoint}`);
  },

  async getBySlug<Result>(endpoint: string, slug: string): Promise<Result> {
    return await $fetch<Result>(`${useRuntimeConfig().public.apiBase}${endpoint}/${slug}`);
  },

  async getStoryBySlug<Results>(endpoint: string, slug = "", order?: string | string[], pagination?: number): Promise<Results> {
    const page = pagination ? `?page=${pagination}` : "";
    return await $fetch<Results>(`${useRuntimeConfig().public.apiBase}${endpoint}/${slug}/${order}${page}`);
  },

  async post<Resource>(endpoint: string, payload: any): Promise<Resource> {
    try {
      return await $fetch<Resource>(`${useRuntimeConfig().public.apiBase}${endpoint}`, {
        method: "POST",
        body: payload,
      });
    } catch (err) {
      const fetchError = err as FetchError;
      return Promise.reject({ data: fetchError.data?.message });
    }
  },
};
