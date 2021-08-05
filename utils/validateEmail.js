const validateEmail = (email) => {
  const check =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // console.log(check.test(email.toLowerCase()));
  if (check.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
};

module.exports = validateEmail;
