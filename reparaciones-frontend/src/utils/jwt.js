export const parseJwt = (token) => {
  try {
    const base64 = token.split('.')[1];
    const json = atob(base64);
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};
