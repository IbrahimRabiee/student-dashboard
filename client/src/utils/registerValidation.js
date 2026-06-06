const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email) => {
  return emailRegex.test(email);
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const isValidPassword = (password) => {
  return passwordRegex.test(password);
};

export { isValidEmail, isValidPassword };
