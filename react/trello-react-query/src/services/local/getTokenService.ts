const getTokenService = () => {
  return sessionStorage.getItem('token');
};

export { getTokenService };
