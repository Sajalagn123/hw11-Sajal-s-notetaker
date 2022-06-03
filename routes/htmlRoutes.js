var path = require("path")
var router = require("express").Router()

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Serves the notes page
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// Serves the homepage
router.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

// Allows user to save notes
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

//Makes delete icon functional
router.delete("/api/notes/:id", (req, res) => {

    var currentSaves = fs.readFileSync(path.join(process.cwd(), "/db/db.json"));
   
    currentSaves = JSON.parse(currentSaves)
    
    
    currentSaves.map(function(a,b){ 
      
        if (currentSaves[b].id == req.params.id){
           
            currentSaves.splice(b,1)
        }
    })

    fs.writeFileSync(path.join(process.cwd(), "/db/db.json"), JSON.stringify(currentSaves))
    


    res.send("sucessfully deleted");

})

module.exports = router
