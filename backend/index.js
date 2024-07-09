const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const productRoute = require("./Routes/productRoute.js");
//const userRoute = require("./Routes/userRoute.js");

const PORT = 4000;
const MONGO_URL = "mongodb+srv://sanda:TVRS1234%23@cluster0.r6puny8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(express.json());
app.use(cors());

// test
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database connected successfully");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.use("/api/product", productRoute);
//app.use("/api/user", userRoute);
