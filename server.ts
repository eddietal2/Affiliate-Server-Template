const mongoose                = require("mongoose");
const express                 = require("express");
const app                     = express();
const cors                    = require('cors');
const dotenv                  = require('dotenv');

// Routers
const landingPageRoute = require('./routes/landing.route');
const authRoute = require('./routes/auth.route');
const productsRoute = require('./routes/products.route');
const userProfileRoute = require('./routes/user-profile.route');
const adminRoute = require('./routes/admin.route');


// Configure Environment Variables
dotenv.config();

// Connect to Mongo via Mongoose
mongoose
  // For DeprecationWarning:  collection.ensureIndex is deprecated.  Use createIndexes instead.

  // .set('useCreateIndex', true)
  // .set('useFindAndModify', false)

  .connect(process.env.DB_HOST_PROD, {
    useNewUrlParser: true, useUnifiedTopology: true
  })

  .then(() => console.log('Connected to MongoDB'))

  .catch((err: Error) => console.log(err))

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/landing", landingPageRoute);
app.use("/auth", authRoute);
app.use("/products", productsRoute);
app.use("/user-profile", userProfileRoute);

// Listen on PORT
const port = process.env.PORT || 3000;
app.listen(port, 
  () => {
    console.log(`Listening on port ${port}`)})
    console.log('Affilate Application Server\n');
    

export {}
