import { comissionPublicApi } from "./config";

export const ComissionController={
    getComissions:async ()=>{
        try{
          const result=await comissionPublicApi.get("commission/getAll");
          return result;
        }
        catch(error){
            throw error;
        }
    },
    addComission:async (data)=>{
        try{
          const result=await comissionPublicApi.post("commission/add-commission",data);
           return result;
        }
        catch(error){
            throw error;
        }
    }
}