const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();


const PORT = process.env || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', htmlRoutes);


app.listen(3000, () => console.log(`Listening on PORT ${PORT}`));