import { profilePublicApi } from "./config";

export const refundController = {
  initiateRefund: async ({ orderId, amount }) => {
    try {
      const { data } = await profilePublicApi.post("refund/initiate-refund", {
        orderId, 
        amount,
      });

      console.log("refund response ", data);
      return data; 
    } catch (error) {
      console.error("refund error ", error);
      throw error?.response?.data ?? error;
    }
  },
};
