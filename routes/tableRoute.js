const express = require("express");
const {
  createTable,
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
} = require("../controllers/tableController");
const router = express.Router();
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");

router.post("/add", verifyAuth, verifyAdmin,createTable);
router.get("/", getAllTables);
router.get("/:id", getTableById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateTable);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteTable);

module.exports = router;