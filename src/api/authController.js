import { securedApi } from "./config";

export const AuthenticationController={
    login:async (data)=>{
      try{
        const result=await securedApi.post("/auth/login",data);
        return result;
      }
      catch(error){
        throw error;
      }
    }
};
