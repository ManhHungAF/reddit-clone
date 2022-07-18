import { useQuery } from "@apollo/client";
import React from "react";
import { GET_SUBREDDITS_WITH_LIMIT } from "../graphql/queries";
import SubredditRow from "./SubredditRow";

function TopSubreddits() {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  });

  const subreddits: Subreddit[] = data?.getSubredditListLimit;

  return (
    <div className="sticky hidden mx-5 mt-5 top-36 h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline">
      <p className="p-4 pb-3 mb-1 font-bold text-md">Top Communities</p>

      {/* List Subreddits */}
      <div>
        {subreddits?.map((subreddit, idx) => (
          <SubredditRow
            key={subreddit.id}
            topic={subreddit.topic}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default TopSubreddits;
