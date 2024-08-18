const express = require("express");

const cors = require("cors")

const app = express();

const userRouter = require("./Router/userRouter");

const cookieParser = require("cookie-parser");


app.use(cors({
    credential: true
}));

app.use(express.json());
app.use(
  cookieParser({
    credential: true,
    origin: "https://web.postman.co",
  })
);


app.use("/api/v1/user", userRouter );


const PORT = process.env.PORT || 5001;


app.listen( PORT, () => {
    console.log("listening to port",PORT);
})