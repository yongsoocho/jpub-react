import { IconButton } from "@chakra-ui/react";
import moment from "moment";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export type PostWithDetail = {
  title: string;
  subtitle: string;
  createdAt: string;
  author: string;
} & { content: HTMLElement | string };

const DetailPage = () => {
  const navi = useNavigate();

  const routeToBack = useCallback(() => {
    navi(-1);
  }, [navi]);

  return (
    <div className="w-[50%] mx-auto py-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">{"title dummy"}</h1>
        <IconButton
          aria-label="Search database"
          icon={<CloseIcon />}
          onClick={routeToBack}
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg my-8">{"sub title dummy"}</h2>
        <h6>{moment(new Date(2023, 7, 19, 9, 30)).fromNow()}</h6>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: "<p>content dummy</p>" }}
        className="py-16"
      ></div>
    </div>
  );
};

export default DetailPage;
