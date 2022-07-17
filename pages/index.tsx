import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-7">
      <Head>
        <title>Reddit 2.0 clone</title>
      </Head>
      <PostBox />

      <div className="flex">
        <Feed />
      </div>
    </div>
  );
};

export default Home;
