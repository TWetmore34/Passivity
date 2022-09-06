//Server Imports
const express = require("express");
const userRoutes = require('./routes/userRoutes')
//Choose the PORT the server will listen on.
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', userRoutes)

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
})
