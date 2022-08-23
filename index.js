require("dotenv").config()
const express = require("express");
const mongose = require("mongoose");
const app = express();

const DB_USER = process.env.DB_USERNAME;
const DB_PASS = encodeURIComponent(process.env.DB_PASSWORD);

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//ROTAS
const personRoute = require("./routes/Person.routes")

app.use("/person", personRoute)

mongose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASS}@api-node.g8zmkcn.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log("connectado ao mongo");
		app.listen(3000);
	})
	.catch((e) => {
		console.log(e);
	});
