import { Image } from "@/types";

export default defineNuxtPlugin(() => {
  function getImgPath(image: Image, variant: string): string {
    return `${useRuntimeConfig().public.backendUrl}/storage/${image.path}${image.title}${variant}.${image.extension}`;
  }

  return {
    provide: {
      getImgPath: (image: Image, variant: string) => getImgPath(image, variant),
    },
  };
});
