const fs = require("fs/promises");

const path = __dirname + "/data.json";

let userState = { usersTemp: [] };

async function readDb() {
    userState.usersTemp = JSON.parse(await fs.readFile(path));
}

readDb();

function writeDb(data) {
    fs.writeFile(path, JSON.stringify(data));
}

module.exports = { userState, writeDb };
