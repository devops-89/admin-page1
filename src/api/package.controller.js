import { packagePublicApi } from "./config";

export const PackageController = {
  getPackageDayList: async () => {
    try {
      const result = await packagePublicApi.get("/package/pkgday/list");
      return result;
    } catch (error) {
      throw error;
    }
  },
  addPackageDayList: async (data) => {
    try {
      const result = await packagePublicApi.post("/package/pkgday/add", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatePackageDayList: async (id, data) => {
    try {
      const result = await packagePublicApi.post(
        `/package/pkgday/update?pkgday_id=${id}`,
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addAmenity:async (data)=>{
  try{
    const result=await packagePublicApi.post("/package/amenities/add",data);
    return result;
    
  }
  catch(error)
  {
    throw error;
  }
  },
  getAmenities: async ()=>{
    try{
       const result=await packagePublicApi.get("/package/amenities/getAll");
       return result;
    }
    catch(error){
      throw error;
    }
  },
  getCategories: async ()=>{
    try{
      const result=await packagePublicApi.get("/package/category/getAll");
      return result;
    }
    catch(error){
      throw error;
    }
  },
  addCategory: async (data)=>{
    try{
       const result=await packagePublicApi.post("/package/category/add",data);
       return result;
    }
    catch(error){
      throw error;
    }
  },
  createPackage:async (data)=>{
    try{
      const result=await packagePublicApi.post("package/create",data);
      return result;
    }
    catch(error){
      throw error;
    }
  },
  getPackages: async ()=>{
    try{
       const result=await packagePublicApi.get("package/list");
       return result;
    }
    catch(error){
      throw error;
    }
  }
};
