// Define app using express
import express, { urlencoded, json } from "express";
var app = express()
// Require database SCRIPT file
import { prepare } from "./database.js";
// Require md5 MODULE
import md5 from "md5";
// Make Express use its own built-in body parser
app.use(urlencoded({ extended: true }));
app.use(json());

// Set server port
var HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new", (req, res) => {
	const newUser = prepare("INSERT INTO userinfo (James, password123)").all();
	res.status(200).json(newUser);
})
// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:id

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Your API is working!"});
    res.status(404);
});
