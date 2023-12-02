
import { useContext, useState } from "react";
import { searchKeyword } from "../../services/search";
import { AuthContext } from "../../context/authContext";

export function useSearchResults() {
  const [keyword, setKeyword] = useState<string>("");
  const [filePath, setFilePath] = useState<string | undefined>("");
  const [fileName, setFileName] = useState<string | undefined>("");
  const {authToken,userInfo}=useContext(AuthContext)

  async function fetchResult(keyword:string) {
    const result = await searchKeyword(keyword,userInfo?.id,authToken);
    return result;
  }

  return {
    keyword,
    setKeyword,
    filePath,
    setFilePath,
    fileName,
    setFileName,
    fetchResult,
  };
}
