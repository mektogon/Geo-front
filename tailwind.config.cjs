module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    container: {
      center: true,
    },

    fontFamily: {
      mono: ["'Montserrat'"],
    },

    extend: {
      backgroundImage: {
        cover: "var(--image-cover)",
      },
    },
  },
  plugins: [],
};
