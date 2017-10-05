/* eslint-disable no-console */

import { timestampFromDateString } from "./utils/date";
import { getAllSubRedditPostsNewerThan } from "./utils/reddit";

const getUniqueDomainsFromSubRedditPosts = async (subReddit, dateString) => {
  const timestamp = timestampFromDateString(dateString);
  const posts = await getAllSubRedditPostsNewerThan(subReddit, timestamp);
  const uniqueDomains = [...new Set(posts.map(post => post.domain))];
  return uniqueDomains;
};

export default getUniqueDomainsFromSubRedditPosts;
