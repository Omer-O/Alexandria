const fs = require('fs');
const knox = require('knox-s3');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'spicedling'
    //this is Davids bucket name - if I create mine I
    //need to change it here
});

module.exports.upload = function(req, res, next) {
    if (!req.file) {
        return res.sendStatus(500);
    }
    ///configaration of the request:
    const s3Request = client.put(req.file.filename, {
    'Content-Type': req.file.mimetype,
    'Content-Length': req.file.size,
    'x-amz-acl': 'public-read'
    });
    ///streaming the request:
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);//listen to response from amazon.
    //store response in veriable:
    s3Request.on('response', s3Response => {
        console.log('s3Response.statusCode:', s3Response.statusCode);
        const wasSuccessful = s3Response.statusCode == 200;
        if (wasSuccessful) {
            next();
        } else {
            res.sendStatus(500);
            //one way to handle if an error occured.
        }
    });
}//upload close
