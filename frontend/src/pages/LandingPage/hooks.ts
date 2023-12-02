import { useState, useEffect, useContext } from "react";
import { fetchFiles } from "../../services/files/api";
import { AuthContext } from "../../context/authContext";

export function useLandingPageState() {
  const [fileData, setFileData] = useState([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (authToken) {
          const files = await fetchFiles(authToken);
          setFileData(files);
          setFetchError(null);
        }
      } catch (error: any) {
        setFetchError(error.message);
      }
    }
    fetchData();
  }, [authToken]);

  return {
    fileData,
    fetchError,
  };
}
