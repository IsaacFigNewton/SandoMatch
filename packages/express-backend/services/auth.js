//auth.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";

const creds = [];

export function registerUser(req, res) {
  const { username, pwd } = req.body; // from form

  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    UserModel.findById(username).then((existingUser) => {
      if (existingUser) {
        res.status(409).send("Username already taken");
      } else {
        bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(pwd, salt))
          .then((hashedPassword) => {
            const newUser = new UserModel({
              _id: username,
              password: hashedPassword,
              reviews: [],
              favoriteSando: null,
              bookmarkedSandos: []
            });
            return newUser.save().then(() => {
              generateAccessToken(newUser).then((token) => {
                console.log("Token:", token);
                res.status(201).send({ token: token });
              });
            });
          });
      }
    });
  }
}

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      (error, decoded) => {
        if (decoded) {
          next();
        } else {
          console.log("JWT error:", error);
          res.status(401).end();
        }
      }
    );
  }
}

export function loginUser(req, res) {
  const { username, pwd } = req.body; // from form

  UserModel.findById(username).then((retrievedUser) => {
    if (!retrievedUser) {
      res.status(401).send("Unauthorized");
    } else {
      bcrypt
        .compare(pwd, retrievedUser.password)
        .then((matched) => {
          if (matched) {
            generateAccessToken(retrievedUser).then((token) => {
              const userDetails = {
                _id: retrievedUser._id,
                favoriteSando: retrievedUser.favoriteSando,
                bookmarkedSandos:
                  retrievedUser.bookmarkedSandos,
                reviews: retrievedUser.reviews
              };
              res
                .status(200)
                .send({ token: token, user: userDetails });
            });
          } else {
            res.status(401).send("Unauthorized");
          }
        })
        .catch(() => {
          res.status(401).send("Unauthorized");
        });
    }
  });
}
