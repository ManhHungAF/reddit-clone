import React from "react";
import Post from "../../components/Post";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import { ADD_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import TimeAgo from "react-timeago";

type FormData = {
  comment: string;
};

function PostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  // add comment and refresh page
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostByPostId"],
  });

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading("Posting your comment...");

    // post comment here...
    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    // clear textarea after post successfully
    setValue("comment", "");

    toast.success("Comment successfully posted!", {
      id: notification,
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-7">
      <Post post={post} />

      <div className="p-5 pl-16 -mt-1 bg-white border border-t-0 border-gray-300 rounded-b-md">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          className="flex flex-col max-w-5xl space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("comment")}
            disabled={!session}
            className="h-24 p-2 pl-4 border border-gray-200 rounded-md outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are your thoughts?" : "Please sign in to comment"
            }
          />

          <button
            type="submit"
            disabled={!session}
            className="p-3 font-semibold text-white bg-red-500 rounded-full disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>

        <div className="px-10 py-5 -my-5 bg-white border border-t-0 border-gray-300 rounded-b-md">
          <hr className="py-2" />

          {post?.comments.map((comment) => (
            <div
              className="relative flex items-center space-x-2 space-y-5"
              key={comment.id}
            >
              <hr className="absolute z-0 h-16 border top-10 left-7" />
              <div className="z-50">
                <Avatar seed={comment.username} />
              </div>

              <div className="flex flex-col">
                <p className="py-2 text-xs text-gray-400">
                  <span className="font-semibold text-gray-600">
                    {comment.username}
                  </span>{" "}
                  • <TimeAgo date={comment.created_at} />
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
