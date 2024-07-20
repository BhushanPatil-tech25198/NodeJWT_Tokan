const express = require("express")
const jwt = require("jsonwebtoken");
const app = express();
const secretekey = "secretekey";

app.get("/", (req, resp) => {
    resp.json({
        message: "a sample api"
    })
})

app.post("/login", (req, resp) => {
    const user = {
        id: 1,
        username: "bhushan",
        email: "abvgs@test.com"
    }
    jwt.sign({ user }, secretekey, { expiresIn: '300s' }, (err, token) => {
        resp.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, resp) => {
    jwt.verify(req.token, secretekey, (err, authData) => {
        if (err) {
            resp.send({ result: "invalid token" })
        } else {
            resp.json({
                message: "profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req, resp, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        resp.send({
            result: "Token is not valid"
        })
    }
}

app.listen(5000, () => {
    console.log("app is running on port: 5000");
})