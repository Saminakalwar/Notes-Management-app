exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.isValidPassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 16) return "Password must not exceed 16 characters.";
  if (!/[A-Z]/.test(password))
    return "Password must include at least one uppercase letter.";
  if (!/[a-z]/.test(password))
    return "Password must include at least one lowercase letter.";
  if (!/[0-9]/.test(password))
    return "Password must include at least one number.";
  if (!/[\W_]/.test(password))
    return "Password must include at least one special character.";
  return true;
};

exports.isNotEmpty = (value) => {
  return value && value.trim() !== "";
};
