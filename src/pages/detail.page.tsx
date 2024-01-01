import { IconButton } from "@chakra-ui/react";
import moment from "moment";
import { CloseIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export type PostWithDetail = {
  title: string;
  subTitle: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
  };
} & { content: HTMLElement | string };

const DetailPage = () => {
  const navi = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState<PostWithDetail>({
    title: "",
    subTitle: "",
    createdAt: "",
    author: {
      id: "",
      name: "",
    },
    content: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postId}`)
      .then(({ data }) => setPost(() => ({ ...data })));
  });

  const routeToBack = useCallback(() => {
    navi("/");
  }, [navi]);

  return (
    <div className="w-[50%] mx-auto py-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl my-8">{post.title}</h1>
        <IconButton
          aria-label="Search database"
          icon={<CloseIcon />}
          onClick={routeToBack}
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg my-8">{post.subTitle}</h2>
        <h6>{moment(post.createdAt).fromNow()}</h6>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="py-16"
      ></div>
    </div>
  );
};

export default DetailPage;
