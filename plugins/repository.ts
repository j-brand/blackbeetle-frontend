import { story, album } from "~/services/api.service";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      albumRepository: album(),
      storyRepository: story(),
    },
  };
});
