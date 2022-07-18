import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import TopSubreddits from "../components/TopSubreddits";

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-7">
      <Head>
        <title>Reddit 2.0 clone</title>
      </Head>
      <PostBox />

      <div className="flex">
        <Feed />
        <TopSubreddits />
      </div>
    </div>
  );
};

export default Home;
