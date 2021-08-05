const validateInputs = (datas) => {
  for (const key in datas) {
    if (datas[key] === "") {
      delete datas[key];
    }
  }
};

module.exports = validateInputs;
