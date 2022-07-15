import { Album, Story } from "@/types/";

function handleErrors(response) {
  if (!response.ok) {
    return response.text().then((text) => {
      throw new Error(text);
    });
  } else {
    return response.json();
  }
}

export default (resource) => ({
  index(): Promise<Album[] | Story[]> {
    return fetch(`${useRuntimeConfig().public.apiBase}${resource}`).then((response) => {
      return response.json();
    });
  },
  show(slug: string | string[], order?: string): Promise<Album> {
    return fetch(`${useRuntimeConfig().public.apiBase}${resource}/${slug}${order ? "/" + order : ""}`).then((data) => {
      return data.json();
    });
  },
});

/*
ALBUM
*/

export const album = () => ({
  index(): Promise<Album[]> {
    return fetch(`${useRuntimeConfig().public.apiBase}/album`).then((response) => {
      return response.json();
    });
  },
  show(slug: string | string[], order?: string): Promise<Album> {
    return fetch(`${useRuntimeConfig().public.apiBase}/album/${slug}${order ? "/" + order : ""}`).then((data) => {
      return data.json();
    });
  },
});

/*
STORY
*/

export const story = () => ({
  index(): Promise<Album[] | Story[]> {
    return fetch(`${useRuntimeConfig().public.apiBase}/story`).then((response) => {
      return response.json();
    });
  },

  show(slug: string | string[], order: string, pagination?: number): Promise<Story> {
    let page = null;
    if (pagination) {
      page = `?page=${pagination}`;
    }

    return fetch(`${useRuntimeConfig().public.apiBase}/story/${slug}/${order}${page ? page : ""}`).then((data) => {
      return data.json();
    });
  },

  subscribe(payload): Promise<any> {
    return fetch(`${useRuntimeConfig().public.apiBase}/newsletter/subscribe`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => handleErrors(response))
      .catch((err: Error) => {
        return Promise.resolve({ data: JSON.parse(err.message) });
      });
  },
});
