import PostCard from "../components/postcard.component";

const dummy = new Array(20)
  .fill({})
  .map((_, idx) => <PostCard key={idx} postId={idx} />);

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
        {dummy}
      </div>
    </>
  );
};

export default MainPage;
