import { securedApi } from "./config";

export const login = async (data) => {
  try {
    const result = await securedApi.post("/auth/login", data);
    // console.log(result);
    return result;
  } catch (error) {
    // console.log("Error login API", error);
    throw error
  }
};
