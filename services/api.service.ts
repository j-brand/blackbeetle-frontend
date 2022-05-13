// Provide nuxt-axios instance to use same configuration across the whole project
// I've used typical CRUD method names and actions here

import { Album, Story } from "@/types/";

export default (resource) => ({
  index(): Promise<Album[] | Story[]> {
    return fetch(`${useRuntimeConfig().public.apiBase}${resource}`).then((response) => {
      return response.json();
    });
  },
  show(slug: string | string[], order?: string): Promise<any> {
    return fetch(`${useRuntimeConfig().public.apiBase}${resource}/${slug}${order ? "/" + order : ""}`).then((data) => {
      return data.json();
    });
  },
});

export const story = () => ({
  index(): Promise<Album[] | Story[]> {
    return fetch(`${useRuntimeConfig().public.apiBase}/story`).then((response) => {
      return response.json();
    });
  },
  
  show(slug: string | string[], order: string, pagination?: number): Promise<any> {
    
    let page = null;
    if (pagination) {
      page = `?page=${pagination}`;
    }
console.log(`${useRuntimeConfig().public.apiBase}/story/${slug}/${order}${page ? page : ""}`);
    return fetch(`${useRuntimeConfig().public.apiBase}/story/${slug}/${order}${page ? page : ""}`).then((data) => {
      return data.json();
    });
  },
});
