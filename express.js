const express = require("express");
const bodyParser = require("body-parser");

const userRoute=require("./routes/userRoutes")
const { Pool } = require("pg");
const dotEnv=require('dotenv')
const app = express();
const port = 4001; 
const ejs=require('ejs')


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

dotEnv.config()
const pool = new Pool({
  user:process.env.DB_USERNAME,
  host:process.env.DB_HOST,
  database:process.env.DATABASE_NAME,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_POART,
 
});
app.use(express.json());
app.use(bodyParser.json());
app.set('view engine','ejs')


app.use('/user',userRoute)
app.get('/sample',(req,res)=>{
  res.render("sample")
})


app.listen(port, () => {
    console.log(
      `Server is now running on port ${port}. Ready to handle incoming requests.`
    );
 
  });

