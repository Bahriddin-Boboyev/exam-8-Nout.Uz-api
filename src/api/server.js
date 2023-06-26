const express = require("express");
const appRoutes = require("./routes");
const config = require("../config");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// CONFIG
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ROUTES
app.use("/api", appRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
