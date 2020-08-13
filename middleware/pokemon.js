const pokemon = require("../pokemon/pokemonDb");

function validatePokemon() {
    return (req, res, next) => {
        if (!req.body)
            return res.status(400).json({ message: "Missing pokemon data" });
        else if (!req.body.name || !req.body.pokemon_number)
            return res.status(400).json({ message: "Missing required name field or pokemon number" });
        next();
    };
}

function validatePokemonId() {
    return (req, res, next) => {
        pokemon
            .getById(req.params.id)
            .then((pokemon) => {
                if (pokemon) {
                    req.pokemon = pokemon;
                    next();
                } else {
                    res.status(400).json({ message: "Invalid pokemon id" });
                }
            })
            .catch(next);
    };
}

module.exports = {
    validatePokemon,
    validatePokemonId
};
