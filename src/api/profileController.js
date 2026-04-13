import { profilePublicApi } from "./config";

export const profileController = {
  getDetail: async () => {
    try {
      const data = await profilePublicApi.get("profile/getProfileInfo");
      console.log("profile data ", data);
      return data.data;
    } catch (error) {
      throw error?.response?.data ?? error;
    }
  },
};
