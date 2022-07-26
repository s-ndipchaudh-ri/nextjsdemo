const Jwt = require("jsonwebtoken");

const { jwtprivatekey } = require("../helpers/constants");


const verifyToken = (req, res, next) => {
   
	try {
		if (req.headers && req.headers.authorization) {
			var token = req.headers.authorization;
			Jwt.verify(token, jwtprivatekey, async (err, tokenData) => {
				console.log("tokenData   ",token, tokenData);
				if (err) {
                    res.json({err : "invalid token"})
                }
				else {
					req.credentials = tokenData;
					req.credentials.accessToken = req.headers.authorization;
					next();
				}
			});
		}
		else {
            res.json({err : "invalid token"})
		}
	}
	catch (err) {
        res.json({err : "invalid token"})
	}
};

module.exports = {
	verifyToken: verifyToken,
};