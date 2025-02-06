const removeTokenService = () => {
  return sessionStorage.removeItem("token");
};

export { removeTokenService };
