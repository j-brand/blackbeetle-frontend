module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./layouts/**/*.{tsx,vue,ts}", "./pages/**/*.{tsx,vue,ts}", "./components/**/*.{tsx,vue,ts}", `plugins/**/*.{js,ts}`, `App.{js,ts,vue}`, `app.{js,ts,vue}`],
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        "bb-lighter": "#EAE7DC",
        "bb-light": "#D8C3A5",
        "bb-black": "#8E8D8A",
        "bb-charcoal": "#373737",
        "bb-charcoal-dark": "#2F2F2F",
        "bb-charcoal-darker": "#292929",
        "bb-light-red": "#E98074",
        "bb-red": "#E85A4F",
      },
      zIndex: {
        "z-01": "1",
      },
      borderWidth: {
        5: "5px",
        6: "6px",
      },
      height: {
        14: "3.5rem",
        28: "7rem",
        36: "9rem",
        72: "18rem",
        96: "24rem",
        112: "28rem",
        116: "29rem",
      },
      maxWidth: {
        "2/5": "40%",
      },
      maxHeight: {
        24: "6rem",
        125: "31.25rem",
      },
      minHeight: {
        "1/2-screen": "50vh",
        "3/4-screen": "75vh",
      },
      width: {
        22: "5.5rem",
        28: "7rem",
        96: "24rem",
      },
      inset: {
        "1/2": "50%",
        "1/4": "25%",
        0: 0,
        4: "1rem",
        6: "1.5rem",
        auto: "auto",
      },
      margin: {
        76: "22rem",
        96: "24rem",
      },
      padding: {
        page: "0.55rem",
      },
      flex: {
        3: "3 3 0%",
      },
      rotate: {
        "-10": "-10deg",
      },
    },
    fontFamily: {
      sans: ["SuperGroteskWeb", "Helvetica Neue", "Arial", "Roboto", "sans-serif"],
      "sans-secondary": ["Roboto", "Helvetica Neue", "Arial", "sans-serif"],
    },
  },
  plugins: [],
};

