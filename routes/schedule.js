var express = require('express');
var router = express.Router();
var sql = require('../sql')
var db = require('../modules/db')
var helper = require('../modules/helper')

router.get('/', function (req, res) {
    res.send("schedule");
});

module.exports = router;