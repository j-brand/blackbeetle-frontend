import { Image } from "@/types";
export default defineNuxtPlugin(() => {
  function getImgPath(image: Image, variant: string): string {
    return `${useRuntimeConfig().publicUrl}/storage/${image.path}${image.title}${variant}.${image.extension}`;
  }

  function getImgObj(image: Image, variant: string) {
    return {
      src: getImgPath(image, variant),
      loading: getImgPath(image, `${variant}_lazy`),
    };
  }

  return {
    provide: {
      getImgObj: (image: Image, variant: string) => getImgObj(image, variant),
    },
  };
});
