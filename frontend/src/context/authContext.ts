import { SetStateAction, createContext, useContext } from "react";
import { User, UserCredentials } from "../utils/interfaces";
import { useAuth0 } from "@auth0/auth0-react";
import { getUsersByEmail, login, registerUser } from "../services/auth";
import { passwordConstant } from "../utils/constants";
import { UserRequest } from "../utils/dto";
export interface AuthContextInterface {
  userInfo?: User;
  authToken?: string;
  setUserInfo?: React.Dispatch<SetStateAction<User | undefined>>;
  setAuthToken?: React.Dispatch<SetStateAction<string>>;
}
export const AuthContext = createContext<AuthContextInterface>({});
export const useAuthContext = () => {
  const { user } = useAuth0();
  const { setUserInfo, setAuthToken } = useContext(AuthContext);
  const checkUserExistOrRegister = async () => {
    const userData: UserCredentials = {
      name: user?.nickname ?? "",
      email: user?.email ?? "",
      password: passwordConstant,
    };
    try {
      const res = await login(user?.email ?? "", passwordConstant);
      setAuthToken?.(res.token.token);
      const UserDetail: User = {
        email: res.user.email,
        name: `${res.user.firstName} ${res.user.lastName}`,
        id: res.user.id,
      };
      setUserInfo?.(UserDetail);
      const data = { userDetail: UserDetail };
      sessionStorage.setItem("userDetail", JSON.stringify(data));
      sessionStorage.setItem("authToken", res.token.token);
    } catch (err) {
      const userData: UserRequest = {
        firstName: user?.nickname ?? "",
        email: user?.email ?? "",
        avatarUrl: user?.avatar ?? "",
        password: passwordConstant,
        lastName:
          (user?.nickname ?? "").substring(
            (user?.nickname ?? "").indexOf(" ")
          ) ?? "",
      };
      const postRes = await registerUser(userData);
      const res = await login(user?.email ?? "", passwordConstant);
      setAuthToken?.(res.token.token);
      const UserDetail: User = {
        email: res.user.email,
        name: `${res.user.firstName} ${res.user.lastName}`,
        id: res.user.id,
      };
      setUserInfo?.(UserDetail);
      const data = { userDetail: UserDetail };
      sessionStorage.setItem("userDetail", JSON.stringify(data));
      sessionStorage.setItem("authToken", res.token.token);
    }
  };
  return {
    checkUserExistOrRegister,
  };
};
