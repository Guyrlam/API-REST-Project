const express = require("express");
const morgan = require("morgan");
const { route } = require("./routers/router");

const app = express();
const PORT = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/user", route);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
