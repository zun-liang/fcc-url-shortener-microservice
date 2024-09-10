import { Router } from "express";
import { shortenUrl, redirectToOriginalUrl } from "./controller.js";
import { validateUrl } from "./middleware.js";

const router = Router();
router.post("/", validateUrl, shortenUrl);
router.get("/:shortUrl", redirectToOriginalUrl);

export default router;
