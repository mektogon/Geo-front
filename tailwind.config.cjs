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
        logo: "var(--image-logo)",
        add: "var(--image-add)",
        find: "var(--image-find)",
        card: "var(--image-card)",
        update: "var(--image-update)",
        delete: "var(--image-delete)",
      },
    },
  },
  plugins: [],
};
