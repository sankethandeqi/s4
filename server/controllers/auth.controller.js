const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { GoogleUserModel, UserSocketModel } = require("../db");
const { JWTKey } = require("../config/config");

async function verifyToken(req, res) {
    const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: config.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    
    const [user] = await GoogleUserModel
        .findOrCreate({
            where: {
                sub: payload.sub
            },
            defaults: {
                sub: payload.sub,
                name: payload.name,
                image_url: payload.picture,
                email: payload.email
            }
        });
        
    await UserSocketModel
        .findOrCreate({
            where: {
                user_id: user.id,
                socket_id: req.body.socketId
            },
            defaults: {
                user_id: user.id,
                socket_id: req.body.socketId
            }
        });

    res.send({
        data: {       
            token: jwt.sign(
                user.id,
                JWTKey
            ),
            id: user.id,
            name: user.name,
            email: user.email,
            imageUrl: user.image_url
        },
        success: true
    });

}

module.exports = {
    verifyToken
};