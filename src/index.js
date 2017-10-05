/* eslint-disable no-console */

import { prettify } from "./utils/object";
import { timestampFromDateString } from "./utils/date";
import { getAllSubRedditPostsNewerThan } from "./utils/reddit";

const subReddit = "programming";
const dateString = "September 10th 2017";
const timestamp = timestampFromDateString(dateString);

getAllSubRedditPostsNewerThan(subReddit, timestamp).then(data => {
  const uniqueDomains = [...new Set(data.map(post => post.domain))];
  console.log(
    prettify(uniqueDomains),
    `Look up ^^^^ for  the list of unique domains in subreddit '${subReddit}' posts since '${dateString}'`
  );
});
