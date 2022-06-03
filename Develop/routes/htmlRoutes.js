var path = require("path")
var router = require("express").Router()

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

router.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.post("/api/notes", (req, res) => {


    var currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));

    var newSaves;

    
    currentSaves = JSON.parse(currentSaves)

    newSaves = [...currentSaves, { title: req.body.title, text: req.body.text, id: uuidv4() }];
    


    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(newSaves))

    res.send("success");

});

router.get("/api/notes", (req, res) => {
    const currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    res.send(currentSaves)

});

router.delete("/api/notes/:id", (req, res) => {

    var currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
    //console.log("current list")
    currentSaves = JSON.parse(currentSaves)
    //console.log("notes id ",currentSaves[0].id, "delete id ",req.params.id )
    
    currentSaves.map(function(a,b){ 
        //console.log("index number ",b," .... data ",a.id,a.title,a.text) 
        if (currentSaves[b].id == req.params.id){
            //delete currentSaves[b]
            currentSaves.splice(b,1)
        }
    })

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(currentSaves))
    //console.log("note deleted ",req.params.id);


    res.send("sucessfully deleted");

})

module.exports = router
