// Importing a library 'express' 
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

// Importing the folder database
import "./database";
//Importing the archive routes
import { routes } from "./routes";
import { RepositoryNotFoundError } from "typeorm";

// Creating the app/server express
const app = express();

// Define where is the public archives
app.use(express.static(path.join(__dirname, "../", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Rota para renderizar uma página html
app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

const http = createServer(app); // Criando o protocolo http
const io = new Server(http);    // Criando protocolo ws

io.on("connection", (socket: Socket) => {
  console.log("Connected!", socket.id);
});

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

export { http, io };