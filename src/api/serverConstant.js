// const baseURL = "https://dev.page1travels.com/admin";
// const authenticationBaseUrl="http://192.168.1.21:3000";
// const packageBaseUrl="http://192.168.1.21:3005";

const authenticationBaseUrl="https://dev.page1travels.com/auth";
const packageBaseUrl="https://dev.page1travels.com/admin";
const baseURL = "https://dev.page1travels.com";
const comissionBaseUrl="https://dev.page1travels.com/admin"
const testHotlierUrl="http://localhost:3005";



export const APIURL={
    authenticationUrl:`${authenticationBaseUrl}/api`,
    packageUrl:`${packageBaseUrl}/api`,
    extraDetailUrl : `${baseURL}/utility-services/api/`,
    hotlierUrl:`${testHotlierUrl}/api`,
    comissionUrl:`${comissionBaseUrl}/api`
}
