let storedVetID = null;
let storedToken = null;

export const setVetID = (vetID) => {
  storedVetID = vetID;
};

export const getVetID = () => {
  return storedVetID;
};

export const setToken = (token) => {
  storedToken = token;
};

export const getToken = () => {
  return storedToken;
};

export const logout = () => {
  storedToken = null;
  
};