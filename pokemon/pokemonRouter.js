const express = require("express");
const {validatePokemon, validatePokemonId} = require("../middleware/pokemon");
const db = require("../pokemon/pokemonDb");

const router = express.Router();

router.post("/", validatePokemon(), (req, res) => {
    db.insert(req.body)
        .then(pokemon => {
            res.status(201).json(pokemon);
        })
        .catch(err => {
            console.log(err.stack);
            res.status(500).json({message: "Error creating new pokemon"});
        });
});

router.get("/", async (req, res) => {
    const pokemon = await db.get();
    try {
        res.status(200).json({pokemon: pokemon});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({message: "Error trying to get pokemon"});
    }
});

router.get("/:id",validatePokemonId(), async (req, res) => {
    const pokemon = await db.getById(req.params.id);
    try{
        res.status(200).json({pokemon: pokemon});
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error getting pokemon"});
    }
});

router.delete("/:id",validatePokemonId(), async (req, res) => {
    const delPoke = await db.getById(req.params.id);
    try{
        db.remove(req.params.id);
        res.status(200).json({pokemonDeleted: delPoke});
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({message: "Error deleting pokemon"});
    }
});

router.put("/:id", validatePokemonId(), validatePokemon(), async (req, res) => {
    const changes = await db.update(req.params.id, req.body);
    try{
        const pokemon = await db.getById(req.params.id);
        res.status(200).json(pokemon);
    }catch (e) {
        console.log(e.stack);
        res.status(500).json({error: "The pokemon information could not be modified"});
    }
});

module.exports = router;
