import shortUrlModel from "../models/shorturl.model.js";

export const shortUrlDao = (longUrl, shortUrl, userId) => {
  const newUrl = new shortUrlModel({
    full_url: longUrl,
    short_url: shortUrl,
  });
  if (userId) {
    newUrl.user = userId;
  }
  newUrl.save();
};

export const redirectUrlDao = async (id) => {
  const url = await shortUrlModel.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } }
  );
  if (url) {
    return url.full_url;
  } else {
    return "Url not found!!";
  }
};

export const checkCustomAlias = async (customAlias) => {
  const check = await shortUrlModel.findOne({ short_url: customAlias });

  if (check) {
    return false;
  }
  return true;
};
