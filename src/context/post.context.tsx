import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { max, throttle } from "lodash";

type IPost = {
  id: string;
  title: string;
  subTitle: string;
  thumbnail: string;
  content?: string;
  createdAt: Date;
  authorId?: string;
  author?: object;
};

type IPostContext = {
  posts: Array<IPost> | unknown[];
  setPosts: Dispatch<SetStateAction<IPost[] | unknown[]>>;
};

const PostContext = createContext<IPostContext>({
  posts: [],
  setPosts: () => {},
});

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState<IPost[] | unknown[]>([]);
  const currentPage = useRef(1);
  const maxPage = useRef(1);

  const getPostWithPagination = (e) => {
    throttle(async () => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (
        scrollTop + clientHeight >= scrollHeight * 0.75 &&
        currentPage.current < maxPage.current
      ) {
        currentPage.current = currentPage.current + 1;
        const { data: payload } = await axios.get(
          `http://localhost:3000/post?page=${currentPage.current}`
        );
        setPosts((prev) => [...prev, ...payload.posts]);
        maxPage.current = payload.maxPage;
      }
    }, 500)();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post?page=${currentPage.current}`)
      .then(({ data }) => {
        currentPage.current = data.currentPage;
        maxPage.current = data.maxPage;
        setPosts([...data.posts]);
      });

    document.addEventListener("scroll", getPostWithPagination);
    return () => {
      document.removeEventListener("scroll", getPostWithPagination);
    };
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
