export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isNameValid = (value: string) => {
  return /^[A-Za-zА-Яа-яІіЇїЄє' -]{2,}$/.test(value.trim());
};

export const isEmailValid = (email: string) => {
  return emailRegex.test(email);
};

export const isPhoneValid = (phone: string) => {
  return phone.replace(/\D/g, '').length === 9;
};

export const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 9);

  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 7),
    digits.slice(7, 9),
  ].filter(Boolean);

  return parts.join('-');
};

export const isPasswordValid = (password: string, confirm: string) =>
  password.length >= 8 && password === confirm;
