var express = require("express");
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var cors = require('cors');
const dbConfig = require('./config/db.config.js');
//app.use(express.static("."));
//const dotenv = require('dotenv');
//dotenv.config();

console.log("url-> " + dbConfig.url);
var db = mongo.connect(dbConfig.url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function (err, response) {
    if (err) { console.log("MongoDB connection error : " + err); }
    else { console.log('Connected to ' + db, ' + ', response); }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/ping", (req, res) => {
    res.status(200).send({});
});

// require('./routes/main.routes.js')(app);
// require('./routes/user.routes.js')(app);
require('./routes/song.routes.js')(app);
require('./routes/review.routes.js')(app);
require('./routes/playlist.routes.js')(app);

app.listen(8080, () => {
    console.log("Server running on port 8080");
});