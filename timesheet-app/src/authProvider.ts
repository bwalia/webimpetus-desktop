import { AuthProvider, HttpError } from "react-admin";
import data from "./users.json";
const publicURL = import.meta.env.VITE_LOCAL_PUBLIC_URL;
/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const request = new Request(`${publicURL}/auth/user_login`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    try {
      const response = await fetch(request);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
      }
      const auth = await response.json();
      console.log({ auth });
      localStorage.setItem("user", JSON.stringify(auth));
      return await Promise.resolve();
    } catch {
      return await Promise.reject(
        new HttpError("Unauthorized", 401, {
          message: "Invalid username or password",
        })
      );
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
