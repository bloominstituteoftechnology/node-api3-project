

module.exports = async function (req, res, next) {

    try {

        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({error: "Missing post data"})
        }

        const { text } = req.body; 

        if(!text) return res.status(400).send({error: "Please provide text for your post"})


        req.text = text; 

        return next(); 


    }
    catch(e){
        res.status(400).send({message: "missing required text field"})
    }
}