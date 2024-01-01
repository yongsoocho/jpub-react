import { useContext } from "react";
import PostCard from "../components/postcard.component";
import { PostContext } from "../context/post.context";

const PostCards = () => {
  const { posts } = useContext(PostContext);

  return posts.map((e) => (
    <PostCard
      key={e.id}
      postId={e.id}
      title={e.title}
      subTitle={e.subTitle}
      thumbnail={e.thumbnail}
      createdAt={e.createdAt}
    />
  ));
};

const MainPage = () => {
  return (
    <>
      <div
        className="w-[75%] grid mx-auto p-4
                   grid-cols-[repeat(auto-fill,_350px)]
                   grid-rows-[repeat(auto-fill,_400px)]
                   gap-x-16 gap-y-12 justify-center items-center
                   [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2
                   [&>*:nth-child(2)]:col-span-2 [&>*:nth-child(2)]:row-span-2"
      >
        <PostCards />
      </div>
    </>
  );
};

export default MainPage;
