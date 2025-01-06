const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const reencryptionRoutes = require("./routes/reencryptionRoutes");
const storageRoutes = require("./routes/storageRoutes");
const decentralizeRoutes = require("./routes/decentralizeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
var options = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(options));

// Use the encryption routes
app.use("/api", reencryptionRoutes);
app.use("/api/users", userRoutes);
// Use the decentralize routes
app.use("/api/decentralize", decentralizeRoutes);
// Use the IPFS routes
app.use("/api/ipfs", storageRoutes);

// Page Not Found
app.use("*", (req, res) =>{
    res.json({
        message: "Page not found!"
    });
})

sequelize.sync({ force: true }).then(async () => {
    console.log("Database synced!");
}).catch(err => {
    console.error('Unable to sync database:', err);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});