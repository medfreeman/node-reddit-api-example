import { parse } from "chrono-node";

const timestampFromDateString = string => {
  const results = parse(string);
  results[0].start.assign("timezoneOffset", 0);
  const date = results[0].start.date();
  return date.getTime();
};

const timestampFromRedditString = string => {
  const timestamp = parseInt(string) * 1000;
  const date = new Date(timestamp);
  return date.getTime();
};

export { timestampFromDateString, timestampFromRedditString };
