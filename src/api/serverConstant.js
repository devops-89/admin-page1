// const baseURL = "https://dev.page1travels.com/admin";
// const authenticationBaseUrl="http://192.168.1.21:3000";
// const packageBaseUrl="http://192.168.1.21:3005";

const authenticationBaseUrl="https://api.page1travels.com/auth";
const packageBaseUrl="https://api.page1travels.com/admin";
const baseURL = "https://api.page1travels.com";
const comissionBaseUrl="https://api.page1travels.com/admin"
const hotlierUrl="https://api.page1travels.com/admin";

 

export const APIURL={
    authenticationUrl:`${authenticationBaseUrl}/api`,
    packageUrl:`${packageBaseUrl}/api`,
    extraDetailUrl : `${baseURL}/utility-services/api/`,
    hotlierUrl:`${hotlierUrl}/api`,
    comissionUrl:`${comissionBaseUrl}/api`,
    customerUrl:`${hotlierUrl}/api`
}
