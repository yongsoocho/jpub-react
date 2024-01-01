import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type ISessionContext = {
  user:
    | {
        id: string;
        name: string;
        loginAt: Date;
      }
    | object;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const SessionContext = createContext<ISessionContext>({
  user: {},
  isLogin: false,
  setIsLogin: () => {},
});

const SessionProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/login", { withCredentials: true })
      .then(({ data }) => {
        if (!Object.keys(data).length) {
          throw new Error("invalid session");
        }
        setIsLogin(true);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SessionContext.Provider value={{ user: {}, isLogin, setIsLogin }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
