import tsConfig from "#tailwind-config";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tailwind: tsConfig.theme,
    },
  };
});
