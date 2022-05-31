import twConfig from "@/tailwind.config";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tailwind: twConfig.theme.extend,
    },
  };
});
