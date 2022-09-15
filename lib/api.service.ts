import { FetchError } from "ohmyfetch";
import { PagedPosts } from "~~/types";

function handleErrors(response) {
  console.log(response.ok);
  if (!response.ok) {
    console.log(response);
    return response.text().then((text) => {
      throw new Error(text);
    });
  } else {
    return response.json();
  }
}

export const apiService = {
  async get<Result>(endpoint: string, order?: string): Promise<Result> {
    return await $fetch(`${useRuntimeConfig().public.apiBase}${endpoint}`, { parseResponse: JSON.parse });
  },

  async getBySlug<Result>(endpoint: string, slug: string): Promise<Result> {
    return await $fetch(`${useRuntimeConfig().public.apiBase}${endpoint}/${slug}`, { parseResponse: JSON.parse });
  },
  async getStoryBySlug<Results>(endpoint: string, slug = "", order?: string | string[], pagination?: number): Promise<Results> {
    let page = null;
    if (pagination) {
      page = `?page=${pagination}`;
    }
    return await $fetch(`${useRuntimeConfig().public.apiBase}${endpoint}/${slug}/${order}${page ? page : ""}`, { parseResponse: JSON.parse });
  },

  async post<Resource>(endpoint: string, payload: any): Promise<Resource> {
    return await $fetch(`${useRuntimeConfig().public.apiBase}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(payload),
      parseResponse: JSON.parse,
    })
      .then((response: Resource) => {
        return response;
      })
      .catch((err:FetchError) => {
        return Promise.reject({ data: err.data.message });
      });
  },
};
