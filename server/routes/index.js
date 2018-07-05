const router = require("express").Router();
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

router.get("/", function(req, res) {
  res.status(200).send("Connected to hactivpress server");
});

router.post("/login", authentication, userController.login);
router.post("/register", userController.register);

module.exports = router;
