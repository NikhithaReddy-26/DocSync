export interface LoginRequest {
    email:string,
    password:string,
  }
export interface UserRequest{
    firstName:string|undefined,
    lastName:string|undefined,
    email:string,
    password:string,
    avatarUrl:string
}

export interface FileMetaData{
  fileId?:string;
  fileName?:string;
  fileType?:string;
  filePath?:string;
  userId?:string;
  trashed?:boolean;
  synced?:boolean;
}
