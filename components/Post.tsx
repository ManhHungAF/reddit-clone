import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";
import { Waveform } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import TimeAgo from "react-timeago";
import toast from "react-hot-toast";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  const upVote = async (isUpvote: boolean) => {
    // check login or not
    if (!session) {
      toast("You'll need to sign in to vote!");
      return;
    }

    // checkif already vote
    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    // add vote
    await addVote({
      variables: {
        post_id: post.id,
        username: session.user?.name,
        upvote: isUpvote,
      },
    });
  };

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;
    if (displayNumber === 0) {
      return votes[0].upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div className="flex items-center justify-center w-full p-10 text-xl">
        <Waveform size={40} lineWeight={3.5} speed={1} color="black" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border hover:border-gray-600">
        {/* Vote */}
        <div className="flex flex-col items-center justify-start p-4 space-y-1 text-gray-400 rounded-l-md bg-gray-50">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${
              vote && "text-red-400"
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && "text-blue-400"
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{" "}
              • Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          {/* Body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* Image */}
          <img className="w-full" src={post.image} alt="" />

          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="w-6 h-6" />
              <p className="">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="w-6 h-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
