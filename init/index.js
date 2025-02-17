const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("67ad93ca418c5a756c124efc"), // Ensure ObjectId format
  }));

  await Listing.deleteMany({}); // Remove old listings
  await Listing.insertMany(initData.data);
  console.log("Database initialized with listings");
};

initDB();



// const mongoose = require('mongoose');
// const Listing = require('../models/listing.js'); // Ensure the correct path to your model
// const listings = require('./data.js'); // Ensure the correct path to your data.js

// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'; // Use your actual database URL

// mongoose.connect(MONGO_URL)
//   .then(() => {
//     console.log('Connected to DB');
//   })
//   .catch(err => {
//     console.log('Connection Error:', err);
//   });

// const initDB = async () => {
//   try {
//     await Listing.deleteMany({}); // Delete old data
//     await Listing.insertMany(listings); // Insert new data
//     console.log('Database initialized with listings');
//   } catch (error) {
//     console.log('Error inserting data:', error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// initDB();


