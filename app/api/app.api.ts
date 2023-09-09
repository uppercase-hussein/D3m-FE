import axios from "../libs/axios";

export const loginReq = async (data:{username:string}) => {
    try {
      let response = await axios.post("/login", data );
      return response.data;
    } catch (error: any | unknown) {
      return error.response?.data;
    }
  }

export const getOutlets = async () => {
    try {
      let response = await axios.get("/outlets");
      return response.data;
    } catch (error: any | unknown) {
      return error.response?.data;
    }
  }


  export const uploadReport = async (data:any) => {
    try{
        let response = await axios.post("/upload/d3m", data.formData,{
            headers: {
                token:data.token,
                // 'Content-Type': 'multipart/form-data',
              }
        })
        return response.data;
      }
      catch(err: any | unknown) {
        return err.response?.data;
      }
}
  
export const getReport = async (data:{queryKey:string[]}) => {
  try{
    let response = await axios.get("/analytics", {
      headers: {
          token:data.queryKey[1],
        }
  });
    return response.data;
  }
  catch(err: any | unknown) {
    return err.response?.data;
  }
}