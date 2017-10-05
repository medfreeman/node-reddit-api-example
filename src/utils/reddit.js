/* eslint-disable no-console */

import { URL, URLSearchParams } from "universal-url";
import join from "url-join";

import { get } from "./request";
import { timestampFromRedditString } from "./date";

const REDDIT_API_URL = "https://apiv2.pushshift.io/reddit/";
const REDDIT_SEARCH_URL = "submission/search/";
const REDDIT_SUBREDDIT_POST_LIMIT = 250;

const redditUrl = (path, urlParams) => {
  const params = new URLSearchParams(urlParams).toString();
  const urlString =
    params !== ""
      ? join(REDDIT_API_URL, path, `?${params}`)
      : join(REDDIT_API_URL, path);
  const url = new URL(urlString);
  return url.toString();
};

const subRedditSearchUrl = (subReddit, urlParams) => {
  const params = {
    subreddit: subReddit,
    ...urlParams
  };

  return redditUrl(REDDIT_SEARCH_URL, params);
};

const getSubRedditPostsBeforeDatePaginated = async (
  subReddit,
  before = undefined
) => {
  const defaultParams = {
    limit: REDDIT_SUBREDDIT_POST_LIMIT
  };

  const params = before ? { ...defaultParams, before } : defaultParams;

  const url = subRedditSearchUrl(subReddit, params);
  console.log("Fetching url: ", url);
  const response = await get(url);
  return response;
};

const postOlderThan = (post, timestamp) => {
  const postTimestamp = post.created_utc
    ? timestampFromRedditString(post.created_utc)
    : 0;
  return postTimestamp < timestamp;
};

const getAllSubRedditPostsBeforeDateRecursive = async (
  subReddit,
  timestamp,
  before = undefined
) => {
  const { data } = await getSubRedditPostsBeforeDatePaginated(
    subReddit,
    before
  );
  if (!data) {
    console.log(
      `There was an error fetching posts from subReddit '${subReddit}'`
    );
    return [];
  }

  const oldestPost = data[data.length - 1];

  if (postOlderThan(oldestPost, timestamp)) {
    return data.filter(post => {
      return !postOlderThan(post, timestamp);
    });
  } else {
    const beforeTimestamp = oldestPost.created_utc + 1;
    const newData = await getAllSubRedditPostsBeforeDateRecursive(
      subReddit,
      timestamp,
      beforeTimestamp
    );
    return [...data, ...newData];
  }
};

const getAllSubRedditPostsNewerThan = async (subReddit, timestamp) => {
  const posts = await getAllSubRedditPostsBeforeDateRecursive(
    subReddit,
    timestamp
  );

  return posts;
};

export { getAllSubRedditPostsNewerThan };
