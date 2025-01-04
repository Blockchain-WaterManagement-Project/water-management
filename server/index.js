require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

// import routes
const tokenRoutes = require('./routes/tokenRoutes');
const storageRoutes = require('./routes/storageRoutes');
const app = express();

// middleware
app.use(bodyParser.json());

// database initialization
sequelize.sync({ force: true }).then(async () => {
    console.log("Database synced!");
}).catch(err => {
    console.error('Unable to sync database:', err);
});

// Use routes
app.use('/api/token', tokenRoutes);
app.use('/api/storage', storageRoutes); // Use storage routes
app.use('*', (req, res, next)=>{
    res.json({
        message: 'Page not found!'
    })
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});