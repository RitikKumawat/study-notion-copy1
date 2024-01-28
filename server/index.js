const express = require("express");
const app = express();


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(  //used to entertain frontend
    cors({

        origin:"https://studynotion-api.onrender.com", 
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)

cloudinaryConnect();

app.use("/auth",userRoutes);
app.use("/profile",profileRoutes);
app.use("/course",courseRoutes);
app.use("/payment",paymentRoutes);
app.use("/contact",contactRoutes);

//default route 
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running...."
    })
})


app.listen(PORT,()=>{
    console.log(`App is running at PORT ${PORT}`);
})

