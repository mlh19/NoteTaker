var router = require("express").router();
var path = require("path");

router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

module.exports = router;