// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "Spices Backend is running 🚀",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const Subscriber = require("./models/Subscriber");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Spices Backend is running 🚀",
  });
});

// Email Save API Endpoint
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Sariyana email id-yai tharavum." });
    }

    // Check already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ 
        message: "Neengal aerkkanave VIP launch list-il ullirgal! ✨", 
        alreadySubscribed: true 
      });
    }

    // Save new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({
      message: "Vettrikaramaaga pathivu seiyappattathu! Launch anru ungalukku exclusive notification varum. 🌿",
    });
  } catch (error) {
    console.error("Subscription Error:", error);
    return res.status(500).json({ error: "Server error. Meendum muyarchikkavum." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});