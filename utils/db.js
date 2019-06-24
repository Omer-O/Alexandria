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

module.exports.uploadImg = function(userId, url) {
    return db.query(
        `UPDATE users
			SET imgUrl = $2
			WHERE id = $1`,
        [userId, url]
    );
};
module.exports.uploadCoverImg = function(userId, url) {
    return db.query(
        `UPDATE users
			SET coverImgUrl = $2
			WHERE id = $1`,
        [userId, url]
    );
};

module.exports.updateBio = function(userId, bio) {
    return db.query(
        `UPDATE users
			SET bio = $2
			WHERE id = $1`,
        [userId, bio]
    );
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

module.exports.findUsers = function(text) {
    if (text == "last3") {
        console.log("last 3 users from db");
        return db.query(
            `
            SELECT * FROM users ORDER BY id DESC LIMIT 3;
            `
        );
    } else {
        return db.query(
            `
            SELECT * FROM users
            WHERE first ILIKE $1 OR last ILIKE $1
            `,
            [text + "%"]
        );
    }
};
/////////////////////////////////   FRIENDSHIPS   //////////////////////////////

module.exports.getFriendshipStatus = function(userId, friendId) {
    return db.query(
        `
        SELECT * FROM friendships
        WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
        `,
        [userId, friendId]
    );
};

module.exports.sendFriendRequest = function(senderId, receiverId) {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [senderId, receiverId]
    );
};
module.exports.deleteFriendRequest = function(senderId, receiverId) {
    return db.query(
        `DELETE FROM friendships WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) RETURNING *`,
        [senderId, receiverId]
    );
};
module.exports.acceptFriendRequest = function(senderId, receiverId) {
    return db.query(
        `UPDATE friendships SET accepted = true WHERE sender_id = $1 AND receiver_id = $2 RETURNING *`,
        [receiverId, senderId]
    );
};
module.exports.forceToBeFriends = function(senderId, receiverId, accepted) {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES ($1, $2, $3) RETURNING *`,
        [senderId, receiverId, accepted]
    );
};
module.exports.forceRequest = function(senderId, receiverId) {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id) VALUES ($1, $2) RETURNING *`,
        [senderId, receiverId]
    );
};
/////////////////////////////////   FRIENDSHIPS   //////////////////////////////

module.exports.getfriends = function(userId) {
    return db.query(
        `
    SELECT users.id, first, last, imgUrl, accepted
    FROM friendships
    JOIN users
	ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
`,
        [userId]
    );
};

////////////////////////////////   MESSAGES    /////////////////////////////////

exports.storeMessages = function(message, sender_id, receiver_id) {
    return db.query(
        `
    INSERT INTO messages (message, sender_id, receiver_id)
    VALUES ($1,$2,$3)
    RETURNING id
    `,
        [message, sender_id, receiver_id]
    );
};

exports.getMessages = function() {
    return db.query(
        `
        SELECT messages.id, first, last, imgurl, message, receiver_id , sender_id ,messages.created_at FROM messages
        JOIN users
        ON sender_id = users.id
        LIMIT 20
        `
    );
};
exports.getNewMessage = function(messages_id) {
    return db.query(
        `
        SELECT messages.id, first, last, imgurl, message, receiver_id , sender_id ,messages.created_at FROM messages
        JOIN users
        ON sender_id = users.id
        WHERE messages.id = $1 ORDER BY id DESC LIMIT 20
        `,
        [messages_id]
    );
};
////////////////////////////////   PRIVATE MESSAGES    /////////////////////////////////

exports.storePrivateMessages = function(message, sender_id, receiver_id) {
    return db.query(
        `
    INSERT INTO messages (message, sender_id, receiver_id)
    VALUES ($1,$2, $3)
    RETURNING *
    `,
        [message, sender_id, receiver_id]
    );
};
