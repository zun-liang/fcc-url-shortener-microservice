import dns from "dns";
import { StatusCodes } from "http-status-codes";

export const validateUrl = (req, res, next) => {
  const inputUrl = req.body.url;
  const { hostname, protocol } = new URL(inputUrl);
  if (!hostname || !protocol) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid url" });
  }
  dns.lookup(hostname, (error) => {
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "invalid url" });
    }
    next();
  });
};
