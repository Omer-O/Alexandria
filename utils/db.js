const spicedPg = require("spiced-pg");
const dburl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/alexandria";
var db = spicedPg(dburl);

////////////7////////store functions/////////////////////////////////

module.exports.storeInUsers = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first,last, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [first || null, last || null, email || null, password || ""]
    );
};
module.exports.storeInDocuments = function(userId, img_url, text, title, tags) {
    return db.query(
        `INSERT INTO documents (user_id,img_url,txt,title,tags) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [userId, img_url, text, title, tags]
    );
};

module.exports.updateDoc = function(docId, title) {
    return db.query(
        `UPDATE documents
			SET title = $2
			WHERE id = $1`,
        [docId, title]
    );
};

module.exports.findDocs = function(text) {
    if (text == "last10") {
        console.log("last 10 docs from db");
        return db.query(
            `
            SELECT * FROM documents ORDER BY id DESC LIMIT 10;
            `
        );
    } else {
        return db.query(
            `
            SELECT * FROM documents
            WHERE txt ILIKE $1 OR title ILIKE $1
            `,
            [text + "%"]
        );
    }
};

module.exports.updateUser = function(
    userId,
    first,
    last,
    bio,
    url,
    email,
    hashedPass
) {
    return db.query(
        `UPDATE users
            SET first = $2, last = $3, bio = $4, url=$5, email=$6, password=$7
            WHERE id=$1;`,
        [userId, first, last, bio, url, email, hashedPass]
    );
};

////////////////////////////get functions////////////////////////////

module.exports.getUserDataById = function(id) {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

module.exports.getUserDataByEmail = function(email) {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};
