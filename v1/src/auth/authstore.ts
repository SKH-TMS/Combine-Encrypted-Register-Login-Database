let isAuthenticated: boolean = false;

export const setAuthTrue = () => {
  isAuthenticated = true;
};

export const setAuthFalse = () => {
  isAuthenticated = false;
};

export const getAuthStatus = () => isAuthenticated;
