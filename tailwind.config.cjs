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
        add: "var(--image-add)",
        find: "var(--image-find)",
        card: "var(--image-card)",
      },
    },
  },
  plugins: [],
};
