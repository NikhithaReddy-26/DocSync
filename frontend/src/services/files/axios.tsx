import axios from "axios";

export default axios.create({
    baseURL:"https://bc116be.spcluster.tk/api/v1",
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  });
