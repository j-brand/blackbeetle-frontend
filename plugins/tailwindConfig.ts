// Tailwind CSS v4 uses CSS variables for theme values
// These colors match the @theme definition in main.css
const themeColors = {
  "bb-white": "#EAE7E3",
  "bb-lighter": "#EAE7DC",
  "bb-light": "#D8C3A5",
  "bb-black": "#8E8D8A",
  "bb-charcoal": "#373737",
  "bb-charcoal-dark": "#2F2F2F",
  "bb-charcoal-darker": "#292929",
  "bb-light-red": "#E98074",
  "bb-red": "#E85A4F",
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tailwind: {
        colors: themeColors,
      },
    },
  };
});
