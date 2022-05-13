
export default defineNuxtPlugin(() => {
  function getExcerpt(text: string, length: number): string {
    let excerpt = text;
    if (excerpt.length >= length) {
      excerpt = excerpt.substring(0, length) + "...";
    }
    return excerpt;
  }

  return {
    provide: {
      getExcerpt: (text: string, length: number) => getExcerpt(text, length),
    },
  };
});
