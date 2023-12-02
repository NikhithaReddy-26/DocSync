import API from "../api";
export const searchKeyword=async(keyword:string,userId?:string,authToken?:string)=>{
    API.defaults.headers.common["Authorization"]=`Bearer ${authToken}`;
    try{
    const response=await API.get(`/files/search?searchKey=${keyword}&userId=${userId}`);
    return  response.data.files;
    }
    catch (error) {
        console.error("Error fetching Results:", error);
        throw error;
      }
  }
