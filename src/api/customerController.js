import { userSecuredApi } from "./config";

export const CustomerController = {
  getCustomerList: async () => {
    try {
      // const url = `/users/get_user_list?limit=${pageSize}&page=${page}`;
      const result = await userSecuredApi.get("customer/getcustomers");
      // console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
