const setTokenService = (token: string) => {
  return sessionStorage.setItem("token", token);
};

export { setTokenService };
