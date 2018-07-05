# My HactivPress App

## Rest API

List of user routes:

| **Route** | **HTTP** | **Description** |
|-----------|:--------:|-----------------|
| /login    |   POST   | Login user      |
| /register |   POSt   | Register user   |

List of article routes:

| **Route**               | **HTTP** | **Description**                                                   |
|-------------------------|:--------:|-------------------------------------------------------------------|
| /article                |    GET   | Get all articles                                                  |
| /article?query          |    GET   | Get articles based on query search (either by author or category) |
| /article/:articleId     |    GET   | Get one article based on article id                               |
| /article                |   POST   | Add new article                                                   |
| /article/:articleId     |    PUT   | Update one article based on article id                            |
| /article/:articleId     |  DELETE  | Delete one article based on article id                            |
| /article/:articleId/img |   POST   | Add image to one article based on article id                      |

##Usage

```npm
npm install
npm start
```