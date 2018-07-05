const router = require("express").Router();
const articleController = require("../controllers/articleController")

router.get("/", articleController.getArticles);
router.get("/:articleId", articleController.getOneArticle);
router.post("/", articleController.addArticle);
router.delete("/:articleId", articleController.deleteArticle);

module.exports = router;
