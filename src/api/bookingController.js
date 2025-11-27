import { bookingPublicApi } from "./config";

export const bookingController = {
  getBookings: async ({ page = 1, limit = 10, orderType = "HOTEL" } = {}) => {
    try {
      const { data } = await bookingPublicApi.get("stats/bookings", {
        params: { page, limit, orderType },
      });
      return data;
    } catch (error) {
      throw error?.response?.data ?? error;
    }
  },
  getStats: async (params = {}) => {
    try {
      const { data } = await bookingPublicApi.get("stats/dashboard-stats", {
        params,
      });
      console.log("skdckndkxnkdnknvknv0", data);
      return data;
    } catch (error) {
      throw error?.response?.data ?? error;
    }
  },
};
