#!/usr/bin/env node

const { prettify } = require("../dist/utils/object");
const getUniqueDomainsFromSubRedditPosts = require("../dist").default;

const subReddit = "programming";
const dateString = "September 10th 2017";

getUniqueDomainsFromSubRedditPosts(
  subReddit,
  dateString
).then(uniqueDomains => {
  console.log(
    prettify(uniqueDomains),
    `Look up ^^^^ for  the list of unique domains in subreddit '${subReddit}' posts since '${dateString}'`
  );
  process.exit(0);
});
