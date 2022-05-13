export default defineEventHandler((slug: string, order: "asc" | "desc", pagination?: number) => {
  let page = null;
  if (pagination) {
    page += `?page=${pagination}`;
  }

  return fetch(`${useRuntimeConfig().public.apiBase}/story/${slug}/${order}${page ? page : ""}`).then((data) => {
    return data.json();
  });
});
