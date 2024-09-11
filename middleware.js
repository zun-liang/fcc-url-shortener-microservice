import dns from "dns";

export const validateUrl = (req, res, next) => {
  const inputUrl = req.body.url;
  const { hostname } = new URL(inputUrl);
  const urlRegex = /^(http|https):\/\//;
  if (!urlRegex.test(inputUrl)) {
    return res.json({ error: "invalid url" });
  }
  dns.lookup(hostname, (error) => {
    if (error) {
      return res.json({ error: "invalid url" });
    }
    next();
  });
};
