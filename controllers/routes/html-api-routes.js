
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/signin.html"));
    });

    app.get("/fp/foodprovider", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/foodprovider.html"));
    });

    /*
    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/signup.html"));
    });

    app.get("/signin", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/signin.html"));
    });

    

    app.get("/np/nonprofit", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/nonprofit.html"));
    });

    app.get("/np/profile", function(req, res) {
        res.sendFile(path.join(__dirname, "../../views/profile.html"));
    });
    */

};
