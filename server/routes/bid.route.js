const express = require("express");
const { createBid, updateBid, deleteBid } = require("../controllers/bid.controller");

const router = express.Router();

router.post("/:productId", createBid);
router.put("/:bidId", updateBid);
router.delete("/:bidId", deleteBid);

module.exports = router;
