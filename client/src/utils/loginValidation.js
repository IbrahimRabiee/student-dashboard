const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 6;
};

export { isValidEmail, isValidPassword };
