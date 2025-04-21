import { extraDetailApi } from "./config";

export const ExtraDetailController = {
  getHelicopter: async (serviceName) => {
    try {
      const url = `page-one-travels?enquiryType=${serviceName}`
      const result = await extraDetailApi.get(url);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
