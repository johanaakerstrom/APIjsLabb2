const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios");
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const { json } = require("body-parser");
const { error } = require("console");
app.use(express.json()); 
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));
    
app.get("/", (req, res) =>{
    res.sendFile(__dirname +"/index.html")
})

let players = [{
    id: 1,
    firstName: "Kevin",
    lastName: "Dur"
}];

//CREATE
app.get("/player", async (req, res) => {
    try{
        let response = await axios.post("https://joak-netapi.azurewebsites.net/player", {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            height: req.body.height,
            weight: req.body.weight 
        })
        res.json({message: "Player was added to the list"})
    } catch (error){

    }
})
//READ
app.get("/players", async (req, res) => {
    try{
        let response = await axios.get("https://joak-netapi.azurewebsites.net/players")
        res.json(response.data)
    } catch(error){

    }
});

//UPDATE
app.get("/updateplayer/:id", async (req, res) =>{
    try{
        let playerToUpdate = await axios.put("https://joak-netapi.azurewebsites.net/updateplayer/${req.params.id}")
        if(!playerToUpdate.data){
            return res.status(404).send("There is no player to update");
        } else{
            playerToUpdate.id = req.body.id,
            existingPlayer.data.firstName = req.body.firstName,
            existingPlayer.data.lastName = req.body.lastName,
            existingPlayer.data.height = req.body.height,
            existingPlayer.data.weight = req.body.weight

            let updatedPlayer = await axios.put("https://joak-netapi.azurewebsites.net/updateplayer/${req.params.id}");
            res.json(updatedPlayer.data);
        }
    } catch(error){
        res.status(500).json({error: "Failed to update player"})
    }
})

//DELETE
app.get("/deleteplayer/:id", async (req, res) => {
    try{
        let response = await axios.delete("https://joak-netapi.azurewebsites.net/deleteplayer/${req.params.id}")

        res.json({message: "Player deletet successfully"});
    } catch(error){
        res.status(500).json({error: "Failed to delete player"})
    }
})


app.listen(PORT, () =>{ 
    console.log("Listening to port " + PORT);
});

