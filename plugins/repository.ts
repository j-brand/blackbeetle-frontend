import { story, album } from "~/services/api.service";
import { apiService } from "~~/lib/api.service";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      albumRepository: album(),
      storyRepository: story(),
      api: apiService,
    },
  };
});
