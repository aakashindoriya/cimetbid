const express = require("express");
const { createBid, updateBid, deleteBid ,getUserBids} = require("../controllers/bid.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/my-bids",authMiddleware,getUserBids)
router.post("/:productId",authMiddleware, createBid);
router.put("/:bidId",authMiddleware, updateBid);
router.delete("/:bidId",authMiddleware, deleteBid);

module.exports = router;
