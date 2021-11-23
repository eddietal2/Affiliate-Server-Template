const mongoose                = require("mongoose");
const express                 = require("express");
const fs                      = require("fs");
const app                     = express();
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// Configure Environment Variables
dotenv.config();

// Connect to Mongo via Mongoose
mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.

  .set('useCreateIndex', true)
  .set('useFindAndModify', false)

  .connect(process.env.DB_HOST_DEV, {
    useNewUrlParser: true, useUnifiedTopology: true
  })

  .then(() => console.log('Connected to MongoDB'))

  .catch(err => console.log(err))

// Middleware
app.use(cors());
app.use(express.json())

// API Routes
app.use()

// Listen on PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))