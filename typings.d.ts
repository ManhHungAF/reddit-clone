type comment = {
  id: number;
  post_id: number;
  text: string;
  username: string;
  created_at: string;
};

type Vote = {
  id: number;
  post_id: number;
  upvote: boolean;
  username: string;
  created_at: string;
};

type Subreddit = {
  id: number;
  topic: string;
  created_at: string;
};

type Post = {
  body: string;
  created_at: string;
  id: number;
  image: string;
  subreddit_id: number;
  title: string;
  username: string;
  votes: Vote[];
  comments: comment[];
  subreddit: Subreddit[];
};
