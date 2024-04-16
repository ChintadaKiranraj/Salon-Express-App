const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 4001; // Choose your desired port

// Use body-parser middleware to parse JSON requests
app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
// Replace with your actual database connection details
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "KIRAN1998",
  port: 5432,
});

app.post("/api/login", async (req, res) => {
  try {
    console.log("inside the login");
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);

    // Check if the user exists in the database
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = userQuery.rows[0];

    if (!user) {
      // User does not exist
      res.status(404).json({
        status: false,
        message: "User not found.",
        code: 404,
      });
      return;
    }

    // Validate the password
    if (password !== user.password) {
      // Incorrect password
      res.status(401).json({
        status: false,
        message: "Incorrect password.",
      });
      return;
    }

    const token = jwt.sign(
      { ...user, password: "", confirm_password: "", profile_photo: "" },
      "root"
    );

    const base64Token = token;

    res.status(200).json({
      status: true,
      user: user,
      message: "User logged in successfully.",
      jwt_token: base64Token,
      roles: ["Shop Owner"],
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, message: "Error logging in user." });
  }
});
// Endpoint for user registration
app.post("/api/registerUser", async (req, res) => {
  try {
    console.log("inside the register user");

    const {
      profilePhoto,
      password,
      firstName,
      lastName,
      email,
      confirmPassword,
      userType,
      phoneNumber,
    } = req.body;

    // Validate input data if needed

    // Example query to insert user data into the Users table
    const result = await pool.query(
      "INSERT INTO users (first_name,last_name,email,password,confirm_password,phone_number,profile_photo,user_type) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        phoneNumber,
        profilePhoto,
        userType,
      ]
    );

    const newUser = result.rows[0];
    console.log("User registered successfully.");
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ success: false, message: "Error registering user." });
  }
});
app.post(
  "/api/save-barberApplication-data/:barberId/:shopId/:ownerId",
  async (req, res) => {
    try {
      console.log("save the barber application data");
      const { barberId, shopId, ownerId } = req.params;
      const { years, months, status, description } = req.body;
      const result = await pool.query(
        "INSERT INTO BarberApplications (shop_id,owner_id,status,experience,description,years,months,barber_id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
        [
          shopId,
          ownerId,
          "pending",
          String(years) + "y " + String(months) + "m",
          description,
          years,
          months,
          barberId,
        ]
      );

      const newApplication = result.rows[0];
      console.log("Barber application submitted successfully.");
      res.status(201).json({
        success: true,
        code: 201,
        message: "Barber application submitted successfully.",
        data: newApplication,
      });
    } catch (error) {
      if (error.code === "23505") {
        // Duplicate key violation
        console.error("Duplicate key violation:", error.detail);
        res.status(400).json({
          success: false,
          message: "Oops.....! You have already applied for this job.",
          code: 400,
        });
      } else {
        console.error("Error during user registration:", error);
        res.status(500).json({
          success: false,
          message: "Error registering user due to " + error,
          code: 500,
        });
      }
    }
  }
);
//if the use is shop owner  after inserting into  the user tabel it will insert into the shop owner table here
app.post("/api/barber-shop-registration/:ownerId", async (req, res) => {
  console.log("inside the barber shop registration");
  console.log(req.body);

  try {
    const { ownerId } = req.params;

    const { location, shopName, profilePhoto } = req.body;

    // Example query to insert user data into the Users table
    const result = await pool.query(
      "INSERT INTO Shops (shop_name, location,owner_id,profile_photo) VALUES ($1, $2, $3,$4) RETURNING *",
      [shopName, location, ownerId, profilePhoto]
    );

    const registeredShopData = result.rows[0];

    res.status(200).json({
      status: true,
      message: "Shop registered successfully.",
      data: registeredShopData,
      code: 200,
    });
  } catch (error) {
    console.error("Error during Shop registration:", error);
    res.status(500).json({
      success: false,
      message: "Error registering shop registration.",
    });
  }
});
app.get("/api/shop-name-availability/:shopName/:ownerId", async (req, res) => {
  console.log("inside the barber shop registration");
  console.log(req.body);

  try {
    const { shopName, ownerId } = req.params;
    console.log("shopName", shopName);
    console.log("ownerId", ownerId);
    // const result = await pool.query(`SELECT * FROM Shops WHERE shopName ='${shopName}' and  ownerid='${ownerId}'`);
    const result = await pool.query(
      `SELECT * FROM shops WHERE shop_name = '${shopName}' AND owner_id <> '${ownerId}'`
    );

    const shopsNames = result.rows;
    console.log("shopsNames", shopsNames);

    const isValuePresent = shopsNames.some((obj) => obj.shop_name === shopName);
    console.log("isValuePresent", isValuePresent);
    if (isValuePresent) {
      res.status(201).json({
        success: true,
        message: "Shop name already exists.",
        shop: shopsNames,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "Shop name is available.",
        shop: shopsNames,
      });
    }
  } catch (error) {
    console.error("Error during Shop registration:", error);
    res.status(500).json({
      success: false,
      message: "Error registering shop registration.",
    });
  }
});
app.post("/api/saloon-booking/:userId/:shopId/:ownerId", async (req, res) => {
  console.log("inside the salon  booking");
  console.log(req.body);

  try {
    const { userId, shopId, ownerId } = req.params;
    const { shopName, location, datetime, saloonService } = req.body;

    console.log(req.body);
    const result = await pool.query(
      "INSERT INTO Bookings (user_id, location,shop_name,barber_id,booking_date_time,status,shop_id,owner_id,saloon_service) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        userId,
        location,
        shopName,
        0,
        datetime,
        "pending",
        shopId,
        ownerId,
        saloonService,
      ]
    );

    const newAppointment = result.rows;

    res.status(200).json({
      status: true,
      code: 200,
      message:
        "Appointment Locked In! Your journey to beauty begins soon. See you at the salon!.",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error during Shop registration:", error);
    res.status(500).json({
      success: false,
      message:
        "Error Oops! Something went wrong. Please try again later for appointment",
    });
  }
});

//api to get all the shops
app.get("/api/get-all-shops/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    console.log("inside the get all shops");
    const sqlQuery = `
    SELECT shops.shop_id, shops.shop_name, shops.location, shops.profile_photo, users.first_name, users.last_name,users.phone_number,users.email
    FROM shops
    JOIN users ON shops.owner_id = users.user_id
    where shops.owner_id = '${ownerId}'
  `;
    const result = await pool.query(sqlQuery);

    const shops = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched all shops successfully.",
      shops,
    });
  } catch (error) {
    console.error("Error during fetching all shops:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all shops" });
  }
});
app.get("/api/get-salon-servicess", async (req, res) => {
  try {
    const sqlQuery = `
    SELECT  *
    FROM salon_services
    ;
`;
    const result = await pool.query(sqlQuery);

    const data = result.rows;

    res.status(200).json({
      success: true,
      code: 200,
      message: "Fetched all salon servicess  successfully.",
      data,
    });
  } catch (error) {
    console.error("Error during fetching all  salon servicess:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching  salon servicess" });
  }
});
app.get("/api/shops-locations", async (req, res) => {
  try {
    console.log("inside the get all shops location");
    const sqlQuery = `
    SELECT DISTINCT location
FROM shops;
  `;

    const result = await pool.query(sqlQuery);

    const data = result.rows;

    res.status(200).json({
      code: 200,
      message: "Fetched all shops  location successfully.",
      data,
      status: true,
    });
  } catch (error) {
    console.error("Error during fetching all shops:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all shops locations" });
  }
});
app.get("/api/shopname-by-location/:location/", async (req, res) => {
  try {
    const { location } = req.params;

    console.log("inside the get all shops location");
    const sqlQuery = `
    SELECT shop_id,shop_name,location,owner_id
FROM shops WHERE location =  '${location}';`;
    const result = await pool.query(sqlQuery);

    const data = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched all shops  location successfully.",
      data,
      code: 200,
    });
  } catch (error) {
    console.error("Error during fetching all shops:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all shops locations" });
  }
});

app.get("/api/get-all-shop-owners", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        *
      FROM
        users 
      WHERE user_type Like 'shop_owner'
    `);

    const shopOwners = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched all shop owners successfully.",
      shopOwners,
    });
  } catch (error) {
    console.error("Error during fetching all shop owners:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all shop owners" });
  }
});

app.get("/api/get-all-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched all users successfully.",
      users,
    });
    console.log("Fetched all users successfully.");
    console.log("users", users);
  } catch (error) {
    console.error("Error during fetching all users:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all users" });
  }
});

//get all booking based on shop ownerid
app.get("/api/users-with-bookings/:ownerId", async (req, res) => {
  try {
    console.log("Fetching users with booked appointments");
    const { ownerId } = req.params;
    // Users.ProfilePhoto,
    const sqlQuery = `
      SELECT users.user_id, users.first_name, users.last_name, users.email, users.phone_number,users.user_type,
             bookings.booking_id, bookings.location, bookings.shop_name, bookings.barber_id, bookings.shop_id, bookings.owner_id,
             bookings.booking_date_time, bookings.status
      FROM users
      INNER JOIN bookings ON users.user_id = bookings.user_id
      WHERE bookings.owner_id = ${ownerId} AND bookings.status = 'pending';
    `;

    const result = await pool.query(sqlQuery);
    const data = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched users with booked appointments successfully.",
      data,
    });
  } catch (error) {
    console.error(
      "Error during fetching users with booked appointments:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Error fetching users with booked appointments",
    });
  }
});
app.get("/api/get-locations", async (req, res) => {
  try {
    console.log("Fetching users with booked appointments");

    const sqlQuery = `
      SELECT *
      FROM locations
    
    `;

    const result = await pool.query(sqlQuery);
    const data = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched   Locations  successfully.",
      data,
      code: 200,
    });
  } catch (error) {
    console.error("Error during fetching Locations  successfully", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Locations  successfully",
    });
  }
});
app.get("/api/get-shops-by-location/:location", async (req, res) => {
  try {
    console.log("Fetching users with booked appointments");
    const { location } = req.params;
    const sqlQuery = `
    SELECT * FROM shops WHERE location = '${location}';

    `;

    const result = await pool.query(sqlQuery);
    const data = result.rows;

    res.status(200).json({
      success: true,
      message: "Fetched   Locations  successfully.",
      data,
    });
  } catch (error) {
    console.error("Error during fetching Locations  successfully", error);
    res.status(500).json({
      success: false,
      message: "Error fetching Locations  successfully",
    });
  }
});
app.get(
  "/api/get-barbers-by-shoownerId/:ownerid/:status/:applicationId/:userType",
  async (req, res) => {
    try {
      console.log(
        "Fetching  barbers by shop owner  and status and application id"
      );
      const { ownerid, status, applicationId, userType } = req.params;
      let sqlQuery = "";
      if (userType === "shopowner") {
        sqlQuery = `SELECT u.UserID AS BarberID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.ProfilePhoto,ba.Status,ba.Experience,ba.Description,ba.applicationid
  FROM Users u
  JOIN BarberApplications ba ON u.UserID = ba.BarberID
  WHERE ba.OwnerID = ${ownerid} AND ba.Status ='${status}' and ba.applicationid ='${applicationId}';
  `;
      } else {
        sqlQuery = `SELECT u.UserID AS BarberID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.ProfilePhoto,ba.Status,ba.Experience,ba.Description,ba.applicationid
  FROM Users u
  JOIN BarberApplications ba ON u.UserID = ba.BarberID
  WHERE ba.BarberID = ${ownerid} and ba.applicationid ='${applicationId}';
  `;
      }

      const result = await pool.query(sqlQuery);
      const data = result.rows;

      res.status(200).json({
        status: true,
        message: "Fetched barbers list successfully based on the owner id.",
        data,
        code: 200,
      });
    } catch (error) {
      console.error("Error during fetching barbersList  due to", error);
      res.status(500).json({
        status: false,
        message: "Error during fetching barbersList  due to  " + error,
        code: 500,
      });
    }
  }
);

app.get("/api/barbers-list/:ownerid/:status/:userType", async (req, res) => {
  try {
    console.log("Fetching  barbers by shop owner id or by barber id");

    const { ownerid, status, userType } = req.params;
    console.log(userType);

    console.log("ownerid", ownerid);
    console.log("status", status);
    console.log("userType", userType);

    let sqlQuery = "";

    if (userType === "shopowner") {
      sqlQuery = `SELECT u.UserID AS BarberID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.ProfilePhoto,ba.Status,ba.Experience,ba.Description,ba.applicationid
    FROM Users u
    JOIN BarberApplications ba ON u.UserID = ba.BarberID
    WHERE ba.OwnerID = ${ownerid} AND ba.Status ='${status}';
    `;
    } else if (userType === "Barber") {
      sqlQuery = `SELECT u.UserID AS BarberID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.ProfilePhoto,ba.Status,ba.Experience,ba.Description,ba.applicationid
    FROM Users u
    JOIN BarberApplications ba ON u.UserID = ba.BarberID
    WHERE ba.BarberID = ${ownerid};
    `;
    }

    // const sqlQuery2 = `SELECT u.UserID AS BarberID, u.FirstName, u.LastName, u.Email, u.PhoneNumber, u.ProfilePhoto,ba.Status,ba.Experience,ba.Description,ba.applicationid
    // FROM Users u
    // JOIN BarberApplications ba ON u.UserID = ba.BarberID
    // WHERE ba.OwnerID = ${ownerid} AND ba.Status ='${status}' and ba.applicationid =='${status}';
    // `;

    const result = await pool.query(sqlQuery);
    const data = result.rows;

    res.status(200).json({
      status: true,
      message: `Fetched barbers list successfully based on the ${userType} id`,
      data,
      code: 200,
    });
  } catch (error) {
    console.error("Error during fetching barbersList  due to", error);
    res.status(500).json({
      status: false,
      message: `Error during fetching barbersList  due to   + ${error}`,
      code: 500,
    });
  }
});
app.put("/api/update-shop/:shopId", async (req, res) => {
  try {
    console.log("Update Shop details");
    const { shopId } = req.params;
    const { profilePhoto, phoneNumber, location } = req.body;

    const sqlQuery = `UPDATE Shops SET profilephoto = '${profilePhoto}', location = '${location}' WHERE ShopID = '${shopId}'`;

    const quarry2 = `UPDATE Users SET phonenumber = '${phoneNumber}' WHERE userid = (SELECT ownerid FROM Shops WHERE shopid = '${shopId}')`;
    const result = await pool.query(sqlQuery);
    const result2 = await pool.query(quarry2);

    res.status(200).json({
      status: true,
      message: "Shop data updated successfully.",

      code: 200,
    });
  } catch (error) {
    console.error("Failed to update shop data due to ", error);
    res.status(500).json({
      status: false,
      message: "Failed to update  shop data due to  " + error,
      code: 500,
    });
  }
});
app.get("/api/get-users-appointments/:userId", async (req, res) => {
  try {
    console.log("inside individual user appointments");
    const { userId } = req.params;

    const sqlQuery = `SELECT * FROM bookings WHERE user_id = '${userId}'`;

    const result = await pool.query(sqlQuery);
    const data = result.rows;
    res.status(200).json({
      status: true,
      data,
      message: "Fetched user appointments successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to fetch user appointments due to ", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch user appointments " + error,
      code: 500,
    });
  }
});
app.get("/api/delete-barber-application/:applicationid", async (req, res) => {
  try {
    console.log("inside delete barber  application");
    const { applicationid } = req.params;

    const sqlQuery = `DELETE  FROM barber_applications WHERE application_id = '${applicationid}'`;

    const result = await pool.query(sqlQuery);
    const data = result.rows;
    res.status(200).json({
      status: true,
      data,
      message: "Deleted application successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to delete user appointments due to ", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch user appointments " + error,
      code: 500,
    });
  }
});
app.put(
  "/api/update-barber-application-status/:applicationId/:status",
  async (req, res) => {
    try {
      console.log("inside update appointment");
      const { applicationId, status } = req.params;

      const sqlQuery = `UPDATE BarberApplications SET status = '${status}' WHERE applicationid = '${applicationId}'`;

      const result = await pool.query(sqlQuery);
      const data = result.rows[0];
      res.status(200).json({
        status: true,
        data,
        message: "Application Updated successfully successfully.",
        code: 200,
      });
    } catch (error) {
      console.error("Failed  to update application  status due to  ", error);
      res.status(500).json({
        status: false,
        message: "Failed to update the application status due to " + error,
        code: 500,
      });
    }
  }
);
app.delete("/api/delete-shop/:shopId", async (req, res) => {
  try {
    console.log("inside  the delete shop");
    const { shopId } = req.params;

    const sqlQuery = `DELETE  FROM Shops WHERE shopid = '${shopId}'`;
    const result = await pool.query(sqlQuery);
    const data = result.rows[0];
    res.status(200).json({
      status: true,
      data,
      message: "Shop deleted successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to delete shop  status due to  ", error);
    // Check if the error is due to foreign key constraint violation
    if (error.constraint === "barberapplications_shopid_fkey") {
      res.status(400).json({
        message:
          "If there are no appointments and no pending applications associated with your shop, you can proceed to delete it. Until then, we cannot proceed with the deletion of your shop.",
        status: false,
        code: 400,
      });
    } else
      res.status(500).json({
        status: false,
        message: "Failed to delete  the shop   due to " + error,
        code: 500,
      });
  }
});

app.put("/api/update-user-profile-photo/:userId", async (req, res) => {
  try {
    console.log("inside  Update user  profile photo");
    const { userId } = req.params;

    const sqlQuery = `UPDATE users SET profile_photo = '${req.body.profilePhoto}' WHERE user_id = '${userId}'`;

    const result = await pool.query(sqlQuery);
    const data = result.rows[0];
    console.log(data);
    console.log("User profile photo updated successfully.");
    res.status(200).json({
      status: true,
      data,
      message: "Updated user profile photo successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  Update user  profile photo due to  ", error);
    res.status(500).json({
      status: false,
      message: "Failed to Update user profile photo due to " + error,
      code: 500,
    });
  }
});
app.get("/api/get-user-profile-photo/:userId", async (req, res) => {
  try {
    console.log("inside  the get user profile photo");
    const { userId } = req.params;

    const sqlQuery = `SELECT profile_photo FROM Users WHERE user_id = '${userId}'`;

    const result = await pool.query(sqlQuery);
    const data = result.rows[0];
    res.status(200).json({
      status: true,
      data,
      message: "Fetched user profile photo successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to fetch user profile photo due to  ", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch user profile photo due to " + error,
      code: 500,
    });
  }
});

app.get("/api/saloon-servicess", async (req, res) => {
  const querry = `SELECT * FROM salon_services`;
  const result = await pool.query(querry);
  const data = result.rows;
  res.status(200).json({
    status: true,
    data,
    message: "Fetched salon services successfully.",
    code: 200,
  });
});

app.get("/api/salon-servicess", async (req, res) => {
  const querry = `SELECT * FROM salon_services`;
  const result = await pool.query(querry);
  const data = result.rows;
  res.status(200).json({
    status: true,
    data,
    message: "Fetched salon services successfully.",
    code: 200,
  });
});

app.delete("/api/delete-appointment/:appointment_id", async (req, res) => {
  try {
    console.log("inside  the delete user appointment");
    console.log("req.params", req.params);
    const { appointment_id } = req.params;

    const sqlQuery = `DELETE  FROM bookings WHERE BookingId = '${appointment_id}'`;
    const result = await pool.query(sqlQuery);
    const data = result.rows[0];
    console.log("User appointment deleted successfully.");
    res.status(200).json({
      status: true,
      data,
      message: "User appointment deleted successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to delete User appointment  status due to  ", error);

    res.status(500).json({
      status: false,
      message: "Failed to delete  the barber   due to " + error,
      code: 500,
    });
  }
});

app.put("/api/updatye-booking", async (req, res) => {
  console.log("inside the update booking");

  const {
    userid,
    location,
    shopname,
    bookingdatetime,
    shopid,
    ownerid,
    bookingid,
    saloon_service,
  } = req.body;
  let updateBookingQuerry = `UPDATE Bookings SET Location = '${location}', ShopName = '${shopname}',  ShopID = '${shopid}', OwnerID = '${ownerid}', saloon_service = '${saloon_service}'`;

  // Check if bookingdatetime is not null
  if (bookingdatetime !== null) {
    updateBookingQuerry += ` , BookingDateTime = '${bookingdatetime}' `;
  }
  updateBookingQuerry += ` WHERE BookingID = '${bookingid}'`;

  try {
    console.log("updateBookingQuerry", updateBookingQuerry);
    const result = await pool.query(updateBookingQuerry);
    const data = result.rows[0];
    console.log("User appointment updated successfully.");
    res.status(200).json({
      status: true,
      data,
      message: "User appointment updated successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Failed  to delete User appointment  status due to  ", error);

    res.status(500).json({
      status: false,
      message: "Failed to update the appointment   due to " + error,
      code: 500,
    });
  }
});

//api to get the list of the salon servicess
app.get("/api/view-service-details/:id", async (req, res) => {
  console.log("view service card api is called...");
  const { id } = req.params;
  const querry = `SELECT *  FROM salon_sub_details where service_id=${id}`;
  // const querry = `SELECT * FROM salon_sub_details WHERE service_id = 1;`;
  try {
    const result = await pool.query(querry);
    const data = result.rows;
    console.log(data, "list of the salon servicess");
    res.status(200).json({
      status: true,
      data,
      message: "Fetched the servicess list successfully.",
      code: 200,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Failed Fetched the servicess list successfully.",
      code: 500,
    });
  }
});
app.get("/api/servie-details", async (req, res) => {
  console.log("view service price detaiuls is caled...");

  const querry = `SELECT *  FROM salon_sub_details  order by service_id desc`;

  try {
    const result = await pool.query(querry);
    const data = result.rows;
    console.log(data, "list of the salon servicess");
    res.status(200).json({
      status: true,
      data,
      message: "Fetched the servicess list successfully.",
      code: 200,
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: "Failed Fetched the servicess list successfully.",
      code: 500,
    });
  }
});
app.put("/api/change-password", async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Check if the current password is correct for the given user
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
        code: 404,
      });
    }

    // Compare the current password with the one stored in the database
    const isValidPassword = await comparePasswords(
      currentPassword,
      user.rows[0].password
    );
    if (!isValidPassword) {
      return res.status(400).json({
        status: false,
        message: "Incorrect current password.",
        code: 400,
      });
    }

    // Update the password in the database
    const hashedNewPassword = await hashPassword(newPassword);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      userId,
    ]);

    res.status(200).json({
      status: true,
      message: "Password updated successfully.",
      code: 200,
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      status: false,
      message: "Failed to change password.",
      code: 500,
    });
  }
});
app.listen(port, () => {
  console.log(
    `Server is now running on port ${port}. Ready to handle incoming requests.`
  );
});
