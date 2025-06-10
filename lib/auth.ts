import { isAuthenticated } from "@skymfe/core-library";

export const useIsAuthenticated = () => {
  return isAuthenticated();
};
