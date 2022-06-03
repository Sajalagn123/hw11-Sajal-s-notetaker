const router = require("express").Router();
const path = require("path");
const fs = require('fs');
const uuid = require('uuid');

router.post("/api/notes", (req, res) =>{
    //console.log("post successful for notes !!!!!!")
    res.send("hi");
    /*
    const currentSaves = fs.readFilesSync(path.join(process.cwd(), "/db/db.json"));

    const newSaves = [...currentSaves, {id: req.body.title, text:body.text, id: uuid()}];

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), newSaves)
    */
});


module.exports = router