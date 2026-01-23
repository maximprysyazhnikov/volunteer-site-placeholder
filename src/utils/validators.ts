export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailValid = (email: string) => {
  return emailRegex.test(email);
};
