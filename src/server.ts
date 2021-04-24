// Importing a library 'express' 
import express from "express";
// Importing the folder database
import "./database";
//Importing the archive routes
import { routes } from "./routes";

// Creating the app/server express
const app = express();

app.use(express.json());

app.use(routes);

// Fist GET route of the app
/*app.get("/", (request, response) => {
  return response.send("Hello World!")
});

// To return in json format
/*
app.get("/", (request, response) => {
  return response.json({
    message: "Hello World!",
  });
});

// Fist POST route of the app
app.post("/users", (request, response) => {
  return response.json({
    message: "Sucessfull!"
  });
});*/

// Defining the port that server is running
app.listen(3333, () => console.log("Server is running on port 3333"));