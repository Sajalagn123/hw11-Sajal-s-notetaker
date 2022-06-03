const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

// Makes the port dynamic or chooses port number 3001 
const PORT = process.env.PORT || 3001;

// Added middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Creates path to htmlRoutes.js file
app.use('/', htmlRoutes);

// Listens for dynamic port number and notifies which port it is listening on
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));