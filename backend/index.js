const express = require("express");

const cors = require("cors")

const app = express();

const userRouter = require("./Router/userRouter");

const cookieParser = require("cookie-parser");


app.use(
  cors({
    credentials: true,
    origin: ["https://web.postman.co/", "http://localhost:5173"],
  })
);
app.use(
  cookieParser({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());


app.use("/api/v1/user", userRouter );


const PORT = process.env.PORT || 5001;


app.listen( PORT, () => {
    console.log("listening to port",PORT);
})