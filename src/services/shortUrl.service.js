import { shortUrlDao } from "../dao/shortUrl.dao.js";
import { generateRandomId } from "../utils/helperFunctions.js";

export const createShortWithUser = async (long_url, user) => {
  const short_url = await generateRandomId(7);
  shortUrlDao(long_url, short_url, user);

  return short_url;
};
export const createShortWithoutUser = async (long_url) => {
  const short_url = await generateRandomId(7);
  shortUrlDao(long_url, short_url);

  return short_url;
};
export const createCustomShortWithoutUser = async (long_url, customAlias) => {
  // const short_url = await generateRandomId(7)
  shortUrlDao(long_url, customAlias);

  return customAlias;
};
