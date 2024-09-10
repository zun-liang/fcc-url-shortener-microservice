import { Router } from "express";
import { shortenUrl, redirectToOriginalUrl, notFound } from "./controller.js";
import { validateUrl } from "./middleware.js";

const router = Router();
router.route("/").get(notFound).post(validateUrl, shortenUrl);
router.get("/:shortUrl", redirectToOriginalUrl);

export default router;
