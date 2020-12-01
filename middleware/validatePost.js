

module.exports = async function (req, res, next) {

    try {

        if(!req.body) return res.status(400).send({message: "missing post data"})

        const { text } = req.body; 

        if(!text) return res.status(400).send({error: "Please provide text for your post"})


        req.text = text; 

        return next(); 


    }
    catch(e){
        res.status(400).send({message: "missing required text field"})
    }
}