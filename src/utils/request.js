/* eslint-disable no-console */

import axios from "axios";

const get = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.log(e.code, e.message);
    return false;
  }
};

export { get };
