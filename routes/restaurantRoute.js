const express = require("express");
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { verifyAuth,verifyAdmin } = require("../middleware/authorization");
const router = express.Router();

router.post("/add", verifyAuth, verifyAdmin, createRestaurant);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateRestaurant);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteRestaurant);

module.exports = router;