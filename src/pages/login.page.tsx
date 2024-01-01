import { Stack, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/login.context";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const { setIsLogin } = useContext(SessionContext);

  const onSubmitToLogin = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3000/login",
        {
          name,
          password,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        if (!Object.keys(data).length) {
          throw new Error("invalid session");
        }
        setIsLogin(true);
        navi("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={onSubmitToLogin}>
      <Stack spacing={8} className="py-16 mx-auto w-[450px]">
        <Input
          placeholder="name"
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button colorScheme="twitter" type="submit">
          log in
        </Button>
      </Stack>
    </form>
  );
};

export default LoginPage;
