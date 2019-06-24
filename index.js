const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

const compression = require("compression");
const db = require("./utils/db");
const csurf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bc = require("./utils/bc");

const multer = require(`multer`);
const uidSafe = require(`uid-safe`);
const path = require(`path`);
const s3 = require("./s3");
const amazonUrl = require(`./config`).s3Url;
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(compression());

////////////////////////////////////////////////////////////////////////////////

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///////////////////////////////////APP USE////////////////////////////////////////
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    console.log("io is working");
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
///////////////handle Vulnerabilities//////////////

app.use(csurf()); //place right after bodyParser and cookieSession///

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));

///////////////////////////////// APP GET///////////////////////////////////////

app.get("/", (req, res, next) => {
    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        next();
    }
});

/////////////////////// GET USER//////////////////
app.get("/user", (req, res) => {
    console.log("*******GET /USER*******");
    //console.log("get user: ", req.session);

    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        db.getUserDataById(req.session.userId)
            .then(results => {
                const userData = results.rows[0];
                console.log("got user data: ", userData);
                res.json({
                    id: userData.id,
                    first: userData.first,
                    last: userData.last,
                    bio: userData.bio,
                    imageUrl: userData.imgurl,
                    coverImgUrl: userData.coverimgurl,
                    success: true
                });
            })
            .catch(err => {
                console.log("GET USER DATA", err);
            });
    }
});

/////////////////////////////////////registration login//////////////////////////////////////

app.post("/register", (req, res) => {
    console.log("*******POST REGISTER*******");
    console.log(req.body.email);
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const password = req.body.password;

    if (!first) {
        res.json({
            error: "missing fields..."
        });
        return;
    }
    bc.hashPassword(password)
        .then(hashedPass => {
            return db.storeInUsers(first, last, email, hashedPass);
        })
        .then(results => {
            const user = results.rows[0];
            console.log("user ID: ", user.id);
            req.session.userId = user.id;

            res.json({
                success: true,
                userId: user.id
            });
        })
        .catch(e => {
            res.json({
                success: false,
                error: "something is wrong. please try again"
            });
            console.log("POST REGISTER ERROR: ", e);
        });
});

app.post("/login", (req, res) => {
    console.log("*******POST LOGIN*******");
    console.log("req.body", req.body);

    if (!req.body.email) {
        res.json({
            error: "missing fields..."
        });
    }
    db.getUserDataByEmail(req.body.email)
        .then(results => {
            console.log("password from table:", results.rows[0].password);
            console.log("password from form: ", req.body.password);
            const user = results.rows[0];
            console.log("get user data by id ", user);
            bc.checkPassword(req.body.password, user.password)
                .then(validPassword => {
                    if (validPassword) {
                        console.log("*******correct password******");

                        req.session.userId = user.id;
                        res.json({
                            success: true,
                            userId: user.id
                        });
                    }
                })
                .then(results => {
                    console.log("req.session  = ", req.session);
                });
        })
        .catch(err => {
            console.log("error", err);
            res.json({
                error: "wrong email or passsword!"
            });
        });
});
//////////////////////////////////Logout////////////////////////////////////////

app.get("/logout", (req, res) => {
    console.log("*******LOG OUT*******");
    req.session = null;
    res.redirect("/welcome");
});
//////////////////////////////////POST Uploader777777777777777777777777777777///

app.post("/upload", uploader.single("file"), s3.upload, function(req, res) {
    console.log(req.body);
    // If nothing went wrong the file is already in the uploads directory
    // req.file will refer to the image that was just uploaded
    console.log("req.file: ", req.file);
    // So what we want to store in the images table is the amazonaws URL + the filename.
    var url = `${amazonUrl}${req.file.filename}`;

    if (req.file) {
        let userId = req.session.userId;
        db.uploadImg(userId, url)
            .then(results => {
                console.log(results);
                console.log("uploaded successfuly. image url: ", url);
                res.json({
                    imageUrl: url,
                    success: true
                });
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});
////////////////////////////////// EDIT BIO ////////////////////////////////////////

app.post("/edit-bio", (req, res) => {
    console.log("*******edit bio*****");
    console.log(req.body);

    if (req.body.bio) {
        let bio = req.body.bio;
        let userId = req.session.userId;
        db.updateBio(userId, bio)
            .then(results => {
                console.log(results);
                res.json(results.rows[0]);
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

////////////////////////////////////////////////////////////////////////////////
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
///////////////////////////////SOCKET IO ///////////////////////////////////////
