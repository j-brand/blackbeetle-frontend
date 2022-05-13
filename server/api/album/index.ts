export default defineEventHandler(() => {
  return fetch(`${useRuntimeConfig().public.apiBase}/album`).then((response) => {
    return response.json();
  });
});
