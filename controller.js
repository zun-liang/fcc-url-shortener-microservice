import { StatusCodes } from "http-status-codes";
import Url from "./model.js";
import shortid from "shortid";

export const shortenUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;
    const existingUrl = await Url.findOne({ original_url: originalUrl });
    if (existingUrl) {
      return res
        .status(StatusCodes.OK)
        .json({ original_url: originalUrl, short_url: existingUrl.short_url });
    }

    const shortUrl = shortid.generate();
    const newUrl = await Url.create({
      original_url: originalUrl,
      short_url: shortUrl,
    });
    res
      .status(StatusCodes.OK)
      .json({ original_url: newUrl.original_url, short_url: newUrl.short_url });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error });
  }
};

export const notFound = (req, res) => {
  res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid url" });
};

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const targetUrl = await Url.findOne({ short_url: shortUrl });
    if (targetUrl) {
      return res.redirect(targetUrl.original_url);
    }
    res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid url" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid url" });
  }
};
