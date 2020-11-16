module.exports = {
  lowercaseDashify: (unformatted_str) => {
    return unformatted_str.replace(/\s/g, "-").toLowerCase();
  },
};
