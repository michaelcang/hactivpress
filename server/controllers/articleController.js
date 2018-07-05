const mongoose = require("mongoose");
const { article, user } = require("../models");

module.exports = {
  getArticles: function(req, res) {
    let params = {};
    if (req.query.author) {
      params.author = { $in: req.query.author };
    }
    if (req.query.category) {
      params.category = { $in: req.query.category };
    }
    article
      .find(params)
      .populate("author")
      .then(articles => {
        res.status(200).json({
          msg: "Successfully get list of articles",
          articles
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  getOneArticle: function(req, res) {
    let articleId = req.params.articleId;
    article
      .findById(articleId)
      .populate("author")
      .then(article => {
        res.status(200).json({
          msg: `Successfully get one article!`,
          article
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  addArticle: function(req, res) {
    let payload = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.userId,
      category: req.body.category,
      image: req.file.cloudStoragePublicUrl
    };
    article
      .create(payload)
      .then(newArticle => {
        user.findById(newArticle.author).then(author => {
          author.articles.push(newArticle._id);
          author.save().then(updatedAuthor => {
            res.status(201).json({
              msg: "Successfully add new article!",
              newArticle,
              updatedAuthor
            });
          });
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  deleteArticle: function(req, res) {
    let articleId = req.params.articleId;
    article
      .findByIdAndRemove(articleId)
      .then(article => {
        user.findById(article.author).then(author => {
          author.articles.pull(article._id);
          author.articles.pull(null);
          author.save().then(updatedAuthor => {
            res.status(200).json({
              msg: "Successfully delete the article!",
              article,
              updatedAuthor
            });
          });
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  },
  updateArticle: function(req, res) {
    let articleId = req.params.articleId;
    let updated = {};
    if (req.body.title) {
      updated.title = req.body.title;
    }
    if (req.body.content) {
      updated.content = req.body.content;
    }
    if (req.body.category) {
      updated.category = req.body.category;
    }
    if (req.body.image) {
      updated.image = req.body.image;
    }
    article
      .findByIdAndUpdate(articleId, { $set: updated }, { new: true })
      .then(article => {
        res.status(200).json({
          msg: "Successfully update the article!",
          article
        });
      })
      .catch(err => {
        if (err) {
          res.status(400).json(err);
        }
      });
  }
};
