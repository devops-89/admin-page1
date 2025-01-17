import { userSecuredApi } from "./config";

export const CustomerController = {
  getCustomerList: async (pageSize,page) => {
    try {
      const url = `/users/get_user_list?limit=${pageSize}&page=${page}`;
      const result = await userSecuredApi.get(url);
      // console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
