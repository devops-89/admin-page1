import { hotlierPublicApi } from "./config";

export const HotlierController={

    getHotlier:async ()=>{
        try{
           const result=await hotlierPublicApi.get("hotelier/gethotliers");
           return result;
        }
        catch(error){
            throw error;
        }
    }

};