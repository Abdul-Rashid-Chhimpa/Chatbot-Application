const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require('path');


app.set("view engine", 'ejs');
app.set("views", path.resolve("./views"));
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
    res.render("homePage");
})

app.get("/chatbot", (req, res) => {
    res.render("chatbot")
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/hello", (req, res) => {
    res.send("hello");
})
server.listen(3000, () => {
    console.log("Server is runing on Port : 3000");
})