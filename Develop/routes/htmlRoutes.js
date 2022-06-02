var path = require("path")
var router = require("express").Router()

const fs = require('fs');
//const uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');


router.get("/notes", (req, res) => {
    //console.log("get successful for notes")
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

router.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.post("/api/notes", (req, res) => {
    //console.log("post successful for notes !!!!!!")
    //console.log(req.body)

    var currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));

    var newSaves;
    console.log("previous data")
    if (currentSaves == "") {
        console.log("file is empty");
        newSaves = [{ title: req.body.title, text: req.body.text, id: uuidv4() }];
    }
    else {

        currentSaves = JSON.parse(currentSaves)

        newSaves = [...currentSaves, { title: req.body.title, text: req.body.text, id: uuidv4() }];
    }


    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(newSaves))

    res.send("success");
    /*
    const currentSaves = fs.readFilesSync(path.join(process.cwd(), "/db/db.json"));

    const newSaves = [...currentSaves, {id: req.body.title, text:body.text, id: uuid()}];

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), newSaves)
    */
});

router.get("/api/notes", (req, res) => {
    console.log("get for /api/notes is successful...............")

    const currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    res.send(currentSaves)

});

module.exports = router
