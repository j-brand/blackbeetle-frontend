import createRepository,{story} from "~/services/api.service";

export default defineNuxtPlugin(() => {

  return {
    provide: {
      albumRepository: createRepository("/album"),
      storyRepository: story(),
    },
  };
});
