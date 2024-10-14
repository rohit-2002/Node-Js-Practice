const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
// POST endpoint for MenuItem
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Menu item saved");
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for MenuItem
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route to add a menu item
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Getting the menu item data from request body

    // Create a new menu item document using the Mongoose model
    const newMenuItem = new MenuItem(data);

    // Save the new menu item to the database
    const response = await newMenuItem.save();
    console.log("Menu item saved");
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all menu items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all menu items
    console.log("Menu items fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch menu items by taste
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste; // Extract the taste from the URL parameter

    // Find menu items based on the taste field
    const menuItems = await MenuItem.find({ taste: taste });

    if (menuItems.length > 0) {
      console.log("Menu items with taste fetched");
      res.status(200).json(MenuItem);
    } else {
      res.status(404).json({ error: "No menu items found with this taste" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
