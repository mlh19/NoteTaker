const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// app.listen(PORT, function() {
//     console.log("App listening on PORT: " + PORT);
// });
app.listen(process.env.PORT || 5000);