const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", function(req, res) {
  res.status(200).send("Connected to hactivpress server");
});

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
