const {Router} = require('express');
const {showList, addUser, showUser, changeUser, delUser}= require("../controllers/controllers")
const route = Router();

route.get("/list", showList)
route.get("/:id", showUser)
route.post("/", addUser)
route.put("/:id", changeUser)
route.delete("/:id", delUser)



module.exports = {route}