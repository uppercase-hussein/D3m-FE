import axios from "../libs/axios";

export const loginReq = async (data: { username: string }) => {
  try {
    let response = await axios.post("/login", data);
    return response.data;
  } catch (error: any | unknown) {
    return error.response?.data;
  }
}

export const getOutlets = async () => {
  try {
    let response = await axios.get("/d3m/outlets");
    return response.data;
  } catch (error: any | unknown) {
    return error.response?.data;
  }
}


export const uploadReport = async (data: any) => {
  try {
    let response = await axios.post("/upload/d3m", data.formData, {
      headers: {
        token: data.token,
        // 'Content-Type': 'multipart/form-data',
      }
    })
    return response.data;
  }
  catch (err: any | unknown) {
    return err.response?.data;
  }
}

export const getReport = async (data: { queryKey: any[] }) => {
  let url = "/analytics?query=true";
  if (data.queryKey[2] && data.queryKey[2] !== "0") { url += `&outletId=${data.queryKey[2]}` }
  if (data.queryKey[3]) url += `&timeframe=${data.queryKey[3]}`
  if (data.queryKey[4] && data.queryKey[5]) { url += `&startDate=${data.queryKey[4]}&endDate=${data.queryKey[5]}` }
  if (data.queryKey[6]) url += `&date=${data.queryKey[6]}`
  if (data.queryKey[7]) url += `&product=${data.queryKey[7]}&weeklyProductSales=true&monthlyProductSales=true`
  // console.log(data.queryKey[4], data.queryKey[5])
  // console.log(url)
  try {
    let response = await axios.get(url, {
      headers: {
        token: data.queryKey[1],
      }
    });
    return response.data;
  }
  catch (err: any | unknown) {
    return err.response?.data;
  }
}

export const getProducts = async (data: { queryKey: any[] }) => {
  try {
    let response = await axios.get("/products", {
      headers: {
        token: data.queryKey[1],
      }
    });
    return response.data;
  }
  catch (err: any | unknown) {
    return err.response?.data;
  }
}