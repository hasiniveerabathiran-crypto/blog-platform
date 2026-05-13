const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function readData(file) {
    return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

app.get("/posts", (req, res) => {
    res.json(readData("posts.json"));
});

app.post("/add-post", (req, res) => {

    const posts = readData("posts.json");

    posts.push(req.body);

    writeData("posts.json", posts);

    res.json({ message: "Post Added" });

});

app.delete("/delete-post/:index", (req, res) => {

    const posts = readData("posts.json");

    posts.splice(req.params.index, 1);

    writeData("posts.json", posts);

    res.json({ message: "Post Deleted" });

});

app.get("/comments", (req, res) => {

    res.json(readData("comments.json"));

});

app.post("/add-comment", (req, res) => {

    const comments = readData("comments.json");

    comments.push(req.body);

    writeData("comments.json", comments);

    res.json({ message: "Comment Added" });

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});