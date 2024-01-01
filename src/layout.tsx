import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SessionContext } from "./context/login.context";

const Layout = () => {
  const navi = useNavigate();
  const { isLogin, setIsLogin } = useContext(SessionContext);

  const routeToPublishPage = useCallback(() => {
    navi("/publish");
  }, [navi]);

  const routeToLoginPage = useCallback(() => {
    navi("/login");
  }, [navi]);

  const onClickLogout = () => {
    localStorage.removeItem("user");
    axios
      .delete("http://localhost:3000/login", {
        withCredentials: true,
      })
      .then(() => {
        setIsLogin(false);
        navi("/");
      });
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-16
                   shadow-md z-[999] bg-white"
      >
        <div
          className="w-[1600px] h-full mx-auto box-border p-px
                     flex justify-between items-center"
        >
          <h1 className="text-2xl font-thin">My Blog</h1>

          <div>
            {isLogin ? (
              <ButtonGroup size="sm" isAttached variant="outline">
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={onClickLogout}
                >
                  Log out
                </Button>
                <IconButton
                  aria-label="publish"
                  icon={<AddIcon />}
                  onClick={routeToPublishPage}
                />
              </ButtonGroup>
            ) : (
              <Button
                colorScheme="messenger"
                variant="outline"
                size="sm"
                onClick={routeToLoginPage}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="py-16">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
