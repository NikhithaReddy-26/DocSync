import axios from "axios";
const API_BASE_URL: string = "https://bc116be.spcluster.tk/api/v1";
export default axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
