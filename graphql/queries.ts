import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      id
      title
      body
      subreddit_id
      username
      image
      created_at
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        upvote
        username
        created_at
      }
    }
  }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      id
      title
      body
      subreddit_id
      username
      image
      created_at
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        upvote
        username
        created_at
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getPostByPostId(post_id: $post_id) {
      id
      title
      body
      subreddit_id
      username
      image
      created_at
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        upvote
        username
        created_at
      }
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_SUBREDDITS_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      post_id
      upvote
      username
      created_at
    }
  }
`;
